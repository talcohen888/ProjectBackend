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
}

const featuresController = new FeaturesController();

module.exports = {
    featuresController
};