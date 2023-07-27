const model = require("../schemes/restaurantScheme").RestaurantsModel;

const postRestaurants = (data) => {
  return model.create(data);
};

module.exports = { postRestaurants };