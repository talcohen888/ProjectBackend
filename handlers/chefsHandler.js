const model = require("../schemes/chefScheme").ChefsModel;

const postChef = (data) => {
  return model.create(data);
};

module.exports = { postChef };