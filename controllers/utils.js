const fs = require('fs');
const path = require('path');

function readDataFromFile(filename) {
  console.log(44);
  const filepath = path.join('../jsonFiles', filename);
  const rawData = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(rawData);
}

function writeDataToFile(filename, data) {
  console.log(55);
  const filepath = path.join('../jsonFiles', filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

module.exports = { readDataFromFile, writeDataToFile };
