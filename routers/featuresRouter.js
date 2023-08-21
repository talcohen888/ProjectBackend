const featuresRouter = require("express").Router();
const { featuresController } = require('../controllers/featuresController');

const getFeaturesRouter = () => {
    featuresRouter.get("/", featuresController.getFeatures);

    return featuresRouter;
}

module.exports = getFeaturesRouter;
