const dishesHandler = require("../Handlers/dishesHandler");

const addDish = async (req, res) => {
  try {
    dish = {
      ...req.body,
    };
    const handlerResult = await dishesHandler.postDish(dish);
    res.status(200).json({
      status: "Success",
      data: handlerResult,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error,
    });
  }
};

module.exports = { addDish };