const { readDataFromFile, writeDataToFile } = require("./utils");

class FeaturesController {
    getFeatures = (req, res) => {
        try {
            const features = readDataFromFile('features.json');
            res.status(200).send(features);
        } catch (error) {
            console.error(`getFeatures: ${error}`)
            res.status(500).send("Internal Error")
        }
    };

    updateFeatures = (req, res) => {
        try {
            const featureId = req.body.featureId
            const features = readDataFromFile('features.json');
            const featureIndex = features.findIndex(feature => feature.id === featureId);
            const feature = features[featureIndex];
            feature.isActive = !feature.isActive;
            features[featureIndex] = feature;
            writeDataToFile('features.json', features);
            res.status(200).send(features);
        } catch (error) {
            console.error(`getFeatures: ${error}`)
            res.status(500).send("Internal Error")
        }
    };
}

const featuresController = new FeaturesController();

module.exports = {
    featuresController
};