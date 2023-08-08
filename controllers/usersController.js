const { readDataFromFile, writeDataToFile } = require("./utils");

const addUser = (req, res) => {
  try {
    const usersData = readDataFromFile('users.json');
    const newUser = {
      id: usersData.length + 1,
      ...req.body,
    };

    usersData.push(newUser);
    writeDataToFile('users.json', usersData);
    res.status(200).json({
      status: "Success",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error,
    });
  }
};

const getAllUsers = (req, res) => {
  console.log(11);
  try {
    const usersData = readDataFromFile('users.json');
    res.status(200).json({
      status: "Success",
      data: usersData,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error,
    });
  }
};

module.exports = { addUser, getAllUsers };

