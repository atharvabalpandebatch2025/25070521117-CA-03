
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const port = 5000;
const JWT_SECRET =
  process.env.JWT_SECRET || "college-demo-change-this-secret";

const myDb = client.db("sitSecB");

const userCollection = myDb.collection("users");
const nomineeCollection = myDb.collection("nominees");
const voteCollection = myDb.collection("votes");
const studentCollection = myDb.collection("student");

// -------------------- DATABASE CONNECTION --------------------

async function connectToMongoDb() {
  try {
    await client.connect();

    await userCollection.createIndex(
      { email: 1 },
      { unique: true }
    );

    await voteCollection.createIndex(
      { voterId: 1 },
      { unique: true }
    );

    console.log("Connection successfully done with MongoDB");

    app.listen(port, () => {
      console.log("Server started at port: " + port);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

// -------------------- SIGN UP --------------------

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length < 6
    ) {
      return res.status(400).json({
        message: "Enter your name, email and password (minimum 6 characters)."
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await userCollection.findOne({
      email: cleanEmail
    });

    if (existingUser) {
      return res.status(409).json({
        message: "This email is already registered."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userCollection.insertOne({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      createdAt: new Date()
    });

    return res.status(201).json({
      message: "Account created successfully. Please log in.",
      userId: result.insertedId
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This email is already registered."
      });
    }

    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Could not create account."
    });
  }
});

// -------------------- LOGIN --------------------

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const user = await userCollection.findOne({
      email: email.trim().toLowerCase()
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      message: "Login successful.",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Login failed."
    });
  }
});

// -------------------- VERIFY LOGIN TOKEN --------------------

app.get("/api/auth/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Please log in." });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await userCollection.findOne({
      _id: new ObjectId(payload.userId)
    });

    if (!user) {
      return res.status(401).json({ message: "Account not found." });
    }

    return res.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired login session."
    });
  }
});

// -------------------- DEFAULT NOMINEES --------------------

const defaultNominees = [
  {
    name: "Lionel Messi",
    country: "Argentina",
    club: "Inter Miami",
    image: "/players/messi.jpeg"
   
  },
  {
    name: "Cristiano Ronaldo",
    country: "Portugal",
    club: "Al Nassr",
    image: "/players/ronaldo.jpeg"
  },
  {
    name: "Kylian Mbappe",
    country: "France",
    club: "Real Madrid",
    image: "/players/mbappe.jpeg"
  },
  {
    name: "Erling Haaland",
    country: "Norway",
    club: "Manchester City",
    image: "/players/haaland.jpeg"
  }
];

// -------------------- GET NOMINEES --------------------

app.get("/api/nominees", async (req, res) => {
  try {
    let nominees = await nomineeCollection.find().toArray();

    if (nominees.length === 0) {
      await nomineeCollection.insertMany(defaultNominees);
      nominees = await nomineeCollection.find().toArray();
    }

    const counts = await voteCollection.aggregate([
      {
        $group: {
          _id: "$nomineeId",
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    const countMap = new Map(
      counts.map(item => [item._id, item.count])
    );

    return res.json(
      nominees.map(nominee => ({
        ...nominee,
        votes: countMap.get(nominee._id.toString()) || 0
      }))
    );
  } catch (error) {
    console.error("Nominee error:", error);
    return res.status(500).json({
      message: "Could not load nominees."
    });
  }
});

// -------------------- SUBMIT VOTE --------------------

app.post("/api/votes", async (req, res) => {
  try {
    const { nomineeId } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Please log in before voting."
      });
    }

    let payload;

    try {
      payload = jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
    } catch {
      return res.status(401).json({
        message: "Your login session has expired. Please log in again."
      });
    }

    if (
      typeof nomineeId !== "string" ||
      !ObjectId.isValid(nomineeId)
    ) {
      return res.status(400).json({
        message: "Invalid nominee ID."
      });
    }

    const nominee = await nomineeCollection.findOne({
      _id: new ObjectId(nomineeId)
    });

    if (!nominee) {
      return res.status(404).json({
        message: "Nominee not found."
      });
    }

    await voteCollection.insertOne({
      nomineeId: nominee._id.toString(),
      voterId: payload.userId,
      createdAt: new Date()
    });

    return res.status(201).json({
      message: "Your vote has been saved successfully."
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already voted."
      });
    }

    console.error("Voting error:", error);
    return res.status(500).json({
      message: "Could not submit vote."
    });
  }
});

// -------------------- TOTAL VOTES --------------------

app.get("/api/votes/count", async (req, res) => {
  try {
    const total = await voteCollection.countDocuments();
    return res.json({ total });
  } catch (error) {
    return res.status(500).json({
      message: "Could not get vote count."
    });
  }
});

// -------------------- EXISTING STUDENT APIs --------------------

app.get("/getall", async (req, res) => {
  try {
    const data = await studentCollection.find().toArray();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Could not get students." });
  }
});

app.get("/get/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const student = await studentCollection.findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    return res.json(student);
  } catch (error) {
    return res.status(500).json({ message: "Could not get student." });
  }
});

app.post("/create", async (req, res) => {
  try {
    const { name, age, status, password, email } = req.body;

    if (!password || !email) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const response = await studentCollection.insertOne({
      name,
      age,
      status,
      password: hashedPass,
      email
    });

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Could not create student." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await studentCollection.findOne({ email });

    if (!student || !(await bcrypt.compare(password, student.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { subject: student.name, role: student.status },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({ jwtToken: token });
  } catch (error) {
    return res.status(500).json({ message: "Login failed." });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const { status } = req.body;

    const response = await studentCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status } }
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Student not found." });
    }

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ message: "Could not update student." });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const response = await studentCollection.deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found." });
    }

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ message: "Could not delete student." });
  }
});

// -------------------- START SERVER --------------------

connectToMongoDb();
