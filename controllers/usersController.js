const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const {
  readDataFromFile,
  writeDataToFile,
  updateUserData,
  updateUserActivity,
} = require("./utils");
const { canFollowUser, updateFollowingArray } = require("./followUtils");

const JWT_SECRET_KEY = 'eOdfvZjK3SY4Lm98MeeQVJj2jR0fKJb4s2cqJfiepBh4zX14Q8wPwrwYdVj8WnK1'
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
      res.status(200).send(usersData);
    } catch (error) {
      console.error(`getAllUsers: ${error}`)
      res.status(500).send("Internal Error");
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

  getUser = (req, res) => {
    try {
      const userId = req.params.id
      const usersData = readDataFromFile("users.json");
      const user = usersData.find((userData) => userData.id === userId)
      res.status(200).send(user);
    } catch (error) {
      console.error(`getAllUsers: ${error}`)
      res.status(500).send("Internal Error");
    }
  }

  addUserActivity = (req, res) => {
    try {
      const usersData = readDataFromFile("users.json");
      const userId = req.params.id;
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
      console.error(`addUserActivity: ${error}`)
      res.status(500).send("Internal Server Error");
    }
  }

  followUser = async (req, res) => {
    try {

      const { userId, followUserId } = req.body;

      const users = readDataFromFile('users.json')
      const userIndex = users.findIndex(user => user.id === userId);
      const followUserIndex = users.findIndex(user => user.id === followUserId)

      if (userIndex === -1 || followUserIndex === -1) {
        return res.status(400).send({ message: "User not found" });
      }

      const user = users[userIndex];
      const followUser = users[followUserIndex]

      if (user.following.includes(followUserId)) {
        return res.status(400).send({ message: "Already following this user" });
      }

      user.following.push(followUserId);
      followUser.followers.push(userId)
      users[userIndex] = user
      users[followUserIndex] = followUser
      writeDataToFile('users.json', users)

      res.status(200).send({ message: "Successfully followed user" });
    } catch (error) {
      console.error(`followUser: ${error}`)
      res.status(500).send('Internal Server Error')
    }
  };

  unfollowUser = async (req, res) => {
    try {
      const { userId, unfollowUserId } = req.body;

      const users = readDataFromFile('users.json')
      const userIndex = users.findIndex(user => user.id === userId);
      const unfollowUserIndex = users.findIndex(user => user.id === unfollowUserId)
      if (userIndex === -1 || unfollowUserIndex === -1) {
        return res.status(400).send({ message: "User not found" });
      }

      const user = users[userIndex];
      const unfollowUser = users[unfollowUserId]

      if (!user.following.includes(unfollowUserId)) {
        return res.status(400).send({ message: "Not following this user" });
      }

      const updatedFollowingList = user.following.filter(id => id !== unfollowUserId);
      const updatedFollowersList = unfollowUser.followers.filter(id => id !== userId);
      user.following = updatedFollowingList
      unfollowUser.followers = updatedFollowersList
      users[userIndex] = user
      users[unfollowUserIndex] = unfollowUser
      writeDataToFile('users.json', users)

      res.status(200).send({ message: "Successfully followed user" });
    } catch (error) {
      console.error(`followUser: ${error}`)
      res.status(500).send('Internal Server Error')
    }
  };

  getActiveUser = async (req, res) => {
    if (!req.cookies) {
      return res.status(401).send({ message: 'No token provided.' });
    }

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({ message: 'No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      const users = readDataFromFile('users.json')
      const user = users.find(u => u.id === decoded.id);

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const expiresIn = user.rememberMe ? '10d' : '30m';

      const { password, ...userWithoutPassword } = user;
      const newToken = jwt.sign({ id: decoded.id }, JWT_SECRET_KEY, { expiresIn: expiresIn });

      res.cookie('token', newToken, { httpOnly: true });

      res.status(200).send(
        userWithoutPassword
      );
    } catch (err) {
      console.error(`getActiveUser: ${err}`)
      res.status(500).send({ message: 'Error refreshing token', error: err });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const users = readDataFromFile('users.json');
      const updatedUsers = users.filter(u => u.id !== userId);
      writeDataToFile('users.json', updatedUsers);

      res.status(200).send(updatedUsers);
    } catch (err) {
      console.error(`deleteUser: ${err}`)
      res.status(500).send("Internal Error");
    }
  };

  login = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    const usersData = readDataFromFile("users.json");
    const userIndex = usersData.findIndex(user => user.email === email);
    if (userIndex === -1) {
      return res.status(401).send('Invalid email or password');
    }

    const user = usersData[userIndex]
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send('Invalid email or password');
    }

    const expiresIn = rememberMe ? '10d' : '30m';

    if (user['rememberMe'] === undefined || user['rememberMe'] !== rememberMe) {
      user['rememberMe'] = rememberMe;
      usersData[userIndex] = user
      writeDataToFile('users.json', usersData)
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn });

    res.cookie('token', token, { httpOnly: true, maxAge: rememberMe ? 10 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000 });
    res.status(200).send({ token, user });
  };

  logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).send({ message: 'Logged out successfully' });
  };

  register = async (req, res) => {
    const { email, password, userInfo } = req.body;
    const { firstName, lastName, image, location, occupation } = userInfo

    // need to add validation

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        id: uuidv4(),
        email,
        password: hashedPassword,
        firstName,
        lastName,
        image,
        location,
        occupation,
        following: [],
        followers: [],
        activity: []
      };

      const users = readDataFromFile("users.json")
      users.push(user)
      writeDataToFile('users.json', users)

      res.status(200).send({ message: "User successfully created" });
    } catch (err) {
      console.error(`register: ${err}`)
      res.status(500).send(err);
    }
  };
}

const usersController = new UsersController();

module.exports = {
  usersController,
};
