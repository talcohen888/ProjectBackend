const { readDataFromFile, writeDataToFile } = require("./utils");

class PostsController {
  addPost = (req, res) => {
    try {
      const postsData = readDataFromFile('posts.json');
      const newPost = {
        id: postsData.length + 1,
        ...req.body,
      };

      postsData.push(newPost);
      writeDataToFile('posts.json', postsData);
      res.status(200).json({
        status: "Success",
        data: newPost,
      });
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