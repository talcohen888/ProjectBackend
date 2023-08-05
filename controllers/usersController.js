const usersHandler = require("../handlers/usersHandler");

const addUser = async (req, res) => {
  try {
    user = {
      ...req.body,
    };
    const handlerResult = await usersHandler.postUser(user);
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

module.exports = { addUser };