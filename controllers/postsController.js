const { readDataFromFile, writeDataToFile } = require("./utils");

class PostsController {
  addPost = (req, res) => {
    try {
      const postsData = readDataFromFile('posts.json');

      const newPost = {
        id: postsData.length + 1,
        insertionTime: new Date().toISOString(),
        ...req.body,
        likesUserIds: []
      };

      const userId = parseInt(req.params.userId);
      const usersData = readDataFromFile('users.json');
      const userIndex = usersData.findIndex(user => user.id === userId);

      if (userIndex !== -1) {
        postsData.push(newPost);
        writeDataToFile('posts.json', postsData);

        usersData[userIndex].posts.push(newPost.id);
        writeDataToFile('users.json', usersData);
        
        res.status(200).json({
          status: "Success",
          data: newPost,
        });
      } else {
        res.status(404).json({
          status: "Failed",
          message: "User not found",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        message: error,
      });
    }
  };

  getAllPosts = (req, res) => {
    try {
      const postsData = readDataFromFile('posts.json');
      res.status(200).json({
        status: "Success",
        data: postsData,
      });
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        message: error,
      });
    }
  };
}

const postsController = new PostsController();

module.exports = {
  postsController
};