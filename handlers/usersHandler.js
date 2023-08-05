const model = require("../schemes/userScheme").UsersModel;

const postUser = (data) => {
  return model.create(data);
};

module.exports = { postUser };