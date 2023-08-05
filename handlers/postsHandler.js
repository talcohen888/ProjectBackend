const model = require("../schemes/postScheme").postsModel;

const postPost = (data) => {
  return model.create(data);
};

module.exports = { postPost };