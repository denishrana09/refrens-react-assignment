const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models");
mongoose.connect("mongodb://localhost:27017/react-test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const PORT = process.env.PORT || 3010;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/add_user", async (request, response) => {
  const { name, age } = request.body;
  const user = new userModel({
    name,
    age,
  });

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/users", async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
