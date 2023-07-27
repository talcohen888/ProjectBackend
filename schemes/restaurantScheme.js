const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chefs",
  },
  rating: {
    type: Number,
  },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;