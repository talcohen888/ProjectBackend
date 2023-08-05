import { readDataFromFile, writeDataToFile } from "./utils";

const addPost = (req, res) => {
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

const getAllPosts = (req, res) => {
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

module.exports = { addPost, getAllPosts };
