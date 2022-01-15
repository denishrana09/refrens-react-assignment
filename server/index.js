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

app.post("/add_user", async (request, response) => {
  const { customId, name, items, address, pincode } = request.body;
  const user = new userModel({
    customId,
    name,
    items,
    address,
    pincode,
  });

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

app.get("/users", async (request, response) => {
  let { data } = request.query;
  if (!data) {
    return response.send([]);
  }
  const result = await userModel.find({
    $or: [
      { customId: { $regex: escapeRegex(data), $options: "i" } },
      { name: { $regex: escapeRegex(data), $options: "i" } },
      { address: { $regex: escapeRegex(data), $options: "i" } },
      { pincode: { $regex: escapeRegex(data), $options: "i" } },
      { items: { $regex: escapeRegex(data), $options: "i" } },
    ],
  });

  try {
    return response.send(result);
  } catch (error) {
    return response.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
