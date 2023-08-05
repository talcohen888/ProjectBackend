const postsHandler = require("../handlers/postsHandler");

const addPost = async (req, res) => {
  try {
    post = {
      ...req.body,
    };
    const handlerResult = await postsHandler.postPost(post);
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

module.exports = { addPost };