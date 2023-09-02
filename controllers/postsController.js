const {
  readDataFromFile,
  writeDataToFile,
  getUserName,
  toggleStringInArray,
} = require("./utils");

class PostsController {
  addPost = (req, res) => {
    try {
      const postContent = req.body.content;
      if (postContent.length > 300) {
        res.status(400).json({
          status: "Post too long",
          message: error,
        });
      }
      const postsData = readDataFromFile("posts.json");
      const userId = req.params.userId;
      const usersData = readDataFromFile("users.json");
      const userIndex = usersData.findIndex((user) => user.id === userId);

      if (userIndex !== -1) {
        const userName = getUserName(userId);
        const newPost = {
          id: postsData.length + 1,
          userId: userId,
          userName: userName,
          insertionTime: new Date().toISOString(),
          content: postContent,
          likesUserIds: [],
        };

        postsData.push(newPost);
        writeDataToFile("posts.json", postsData);

        usersData[userIndex].posts.push(newPost.id);
        writeDataToFile("users.json", usersData);

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
      const postsData = readDataFromFile("posts.json");
      res.status(200).send(postsData.reverse());
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        message: error,
      });
    }
  };

  getUserPosts = (req, res) => {
    try {
      const postsData = readDataFromFile("posts.json");
      const usersData = readDataFromFile("users.json");
      const userId = req.params.userId;
      const user = usersData.find((userData) => userData.id === userId);
      const userPosts = postsData.filter((post) =>
        user.posts.includes(post.id)
      );
      res.status(200).send(userPosts.reverse());
    } catch (error) {
      res.status(400).send("Internal Server Error");
    }
  };

  getUserHomepagePosts = (req, res) => {
    try {
      const userId = req.params.userId;
      const usersData = readDataFromFile("users.json");
      const user = usersData.find((user) => user.id === userId);

      if (!user) {
        return res.status(404).json({
          status: "Failed",
          message: "User not found",
        });
      }

      const postsData = readDataFromFile("posts.json");
      const postsOfActiveUser = postsData.filter((post) =>
        user.posts.includes(post.id)
      );
      const postsOfFollowingUsers = postsData.filter((post) =>
        user.following.includes(post.userId)
      );

      const allUserPosts = [...postsOfActiveUser, ...postsOfFollowingUsers];
      allUserPosts.sort((postA, postB) => {
        const dateA = new Date(postA.insertionTime);
        const dateB = new Date(postB.insertionTime);
        return dateB - dateA;
      });

      res.status(200).json({
        status: "Success",
        data: allUserPosts,
      });
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  };

  addLikeToPost = (req, res) => {
    try {
      const userId = req.params.userId;
      const postId = parseInt(req.params.postId);
      const postsData = readDataFromFile("posts.json");
      const postIndex = postsData.findIndex((post) => post.id === postId);

      if (postIndex !== -1) {
        toggleStringInArray(postsData[postIndex].likesUserIds, userId);
        writeDataToFile("posts.json", postsData);

        res.status(200).json({
          status: "Success",
          data: postsData[postIndex],
        });
      } else {
        res.status(404).json({
          status: "Failed",
          message: "Post not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  };

  updateContentPost = (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const postsData = readDataFromFile("posts.json");
      const postIndex = postsData.findIndex((post) => post.id === postId);

      if (postIndex !== -1) {
        postsData[postIndex].content = req.body.newPostContent;
        writeDataToFile("posts.json", postsData);

        res.status(200).json({
          status: "Success",
          data: postsData[postIndex],
        });
      } else {
        res.status(404).json({
          status: "Failed",
          message: "Post not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  };

  deletePost = async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const posts = readDataFromFile('posts.json');
      const updatedPosts = posts.filter(post => post.id !== postId);
      writeDataToFile('posts.json', updatedPosts);

      res.status(200).send(updatedPosts);
    } catch (err) {
      console.error(`deletePost: ${err}`)
      res.status(500).send("Internal Error");
    }
  };
}

const postsController = new PostsController();

module.exports = {
  postsController,
};
