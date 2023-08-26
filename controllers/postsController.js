const { readDataFromFile, writeDataToFile, getUserName } = require("./utils");

class PostsController {
  addPost = (req, res) => {
    try {
      const postsData = readDataFromFile('posts.json');
      const userId = req.params.userId;
      const usersData = readDataFromFile('users.json');
      const userIndex = usersData.findIndex(user => user.id === userId);

      if (userIndex !== -1) {

        const userName = getUserName(userId);
        const newPost = {
          id: postsData.length + 1,
          userId: userId,
          userName: userName,
          insertionTime: new Date().toISOString(),
          ...req.body,
          likesUserIds: []
        };
  
       
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

  getUserPosts = (req, res) => {
    try {
      const postsData = readDataFromFile('posts.json');
      const usersData = readDataFromFile('users.json');
      const userId = req.params.id
      const user = usersData.find((userData) => userData.id === userId)
      const userPosts = postsData.filter((post) => user.posts.includes(post.id))
      res.status(200).send(userPosts);
    } catch (error) {
      res.status(400).send("Internal Server Error");
    }
  }
  
  getUserHomePosts = (req, res) => {
    console.log(111);
    const postsData = readDataFromFile('posts.json');
    const usersData = readDataFromFile('users.json');
    const userId = req.params.id
    const user = usersData.find((userData) => userData.id === userId)
    const userFollows = usersData.find((userData) => userData.id === userId)
    const userPosts = postsData.filter((post) => user.posts.includes(post.id))
    return '1';
  }
}

const postsController = new PostsController();

module.exports = {
  postsController
};