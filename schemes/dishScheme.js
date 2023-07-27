const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  ingredients: {
    type: Array,
    items: {
      type: String,
    },
  },
  tags: {
    type: Array,
    items: {
      type: String,
    },
  },
  img: {
    type: String,
  },
  restaurantRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
  }
});

const Dish = mongoose.model("Dish", DishSchema);

module.exports = Dish;