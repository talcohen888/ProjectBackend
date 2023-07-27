const chefsHandler = require("../Handlers/chefsHandler");

const addChef = async (req, res) => {
  try {
    chef = {
      ...req.body,
    };
    const handlerResult = await chefsHandler.postChef(chef);
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

module.exports = { addChef };