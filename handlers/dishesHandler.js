const model = require("../schemes/dishScheme").DishesModel;

const postDishe = (data) => {
  return model.create(data);
};

module.exports = { postDishe };