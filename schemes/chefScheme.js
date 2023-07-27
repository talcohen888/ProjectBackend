const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const ChefSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Chef = mongoose.model("Chef", ChefSchema);

module.exports = Chef;
