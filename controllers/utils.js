const fs = require('fs');
const path = require('path');

export function readDataFromFile(filename) {
  const filepath = path.join(__dirname, '..', 'data', filename);
  const rawData = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(rawData);
}

export function writeDataToFile(filename, data) {
  const filepath = path.join(__dirname, '..', 'data', filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}
