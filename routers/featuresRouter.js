const featuresRouter = require("express").Router();
const { featuresController } = require('../controllers/featuresController');

const getFeaturesRouter = () => {
    featuresRouter.get("/", featuresController.getFeatures);
    featuresRouter.post("/", featuresController.updateFeatures);

    return featuresRouter;
}

module.exports = getFeaturesRouter;
