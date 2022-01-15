const mongoose = require("mongoose");
const userModel = require("./models");
const { users } = require("./constant");

mongoose.connect("mongodb://localhost:27017/react-test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const runner = async () => {
  const usersData = await userModel.insertMany(users);
  console.info({ users: usersData.length });
};

runner();
