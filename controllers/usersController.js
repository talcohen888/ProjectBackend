const {
  readDataFromFile,
  writeDataToFile,
  updateUserData,
  updateUserActivity,
} = require("./utils");
const { canFollowUser, updateFollowingArray } = require("./followUtils");

class UsersController {
  addUser = (req, res) => {
    try {
      const usersData = readDataFromFile("users.json");

      const newUser = {
        id: usersData.length + 1,
        ...req.body,
        posts: [],
        following: [],
        activity: []
      };

      usersData.push(newUser);
      writeDataToFile("users.json", usersData);

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

  getAllUsers = (req, res) => {
    try {
      const usersData = readDataFromFile("users.json");
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

  updateUser = (req, res) => {
    try {
      const usersData = readDataFromFile("users.json");
      const userId = parseInt(req.params.id);
      const userIndex = usersData.findIndex(user => user.id === userId);

      if (userIndex === -1) {
        return res.status(404).json({
          status: "Failed",
          message: "User not found",
        });
      }

      const followedUserId = parseInt(req.body.following);

      if (followedUserId) {
        const followErrorMessage = canFollowUser(userId, followedUserId);
        if (followErrorMessage) {
          return res.status(400).json({
            status: "Failed",
            message: followErrorMessage,
          });
        }

        // to add following to user add in body of request: "following": [<userId>]
        // note: add only 1 following at a time
        const updatedFollowingArray = updateFollowingArray(
          followedUserId,
          usersData[userIndex].following
        );

        usersData[userIndex].following = updatedFollowingArray;
      }

      usersData[userIndex] = updateUserData(usersData[userIndex], req.body);

      writeDataToFile("users.json", usersData);

      res.status(200).json({
        status: "Success",
        data: usersData[userIndex],
      });
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        message: error,
      });
    }
  };

  addUserActivity = (req, res) => {
    try {
      const usersData = readDataFromFile("users.json");
      const userId = parseInt(req.params.id);
      const userIndex = usersData.findIndex(user => user.id === userId);
      
      if (userIndex === -1) {
        return res.status(404).json({
          status: "Failed",
          message: "User not found",
        });
      }

      usersData[userIndex].activity = updateUserActivity(
        usersData[userIndex].activity,
        req.body.activity
      );

      writeDataToFile("users.json", usersData);

      res.status(200).json({
        status: "Success",
        data: usersData[userIndex],
      });
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        message: error,
      });
    }
  };
}

const usersController = new UsersController();

module.exports = {
  usersController,
};
