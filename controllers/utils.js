const path = require('path');
const fs = require('fs');

function readDataFromFile(filename) {
  const filepath = path.join(__dirname, '..', 'jsonFiles', filename);
  const rawData = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(rawData);
}

function writeDataToFile(filename, data) {
  const filepath = path.join(__dirname, '..', 'jsonFiles', filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

function checkUserExists(userId) {
  const usersData = readDataFromFile('users.json');
  const userIndex = usersData.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return false;
  }
  return true;
}

function updateUserData(userData, newUserData) {
  for (const key in newUserData) {
    if (Object.hasOwnProperty.call(newUserData, key) && key !== 'following') {
      const value = newUserData[key];
      userData[key] = value;
    }
  }
  return userData;
}

function updateUserActivity(currentActivity, newActivity) {
  return [...currentActivity, newActivity];
}

module.exports = { readDataFromFile, writeDataToFile, checkUserExists, updateUserData, updateUserActivity };
