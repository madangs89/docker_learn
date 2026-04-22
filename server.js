import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongUrl = "mongodb://admin:qwerty@localhost:27017";

const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model("User", userSchema);

let counter = 0;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/create-user", async (req, res) => {
  const user = new User({ name: `User${counter++}` });
  await user.save();
  res.send("User created!");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(3000, async () => {
  try {
    await mongoose.connect(mongUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  console.log(`Server is running on http://localhost:3000`);
});
