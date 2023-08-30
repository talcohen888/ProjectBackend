const path = require("path");
const fs = require("fs");

function readDataFromFile(filename) {
  const filepath = path.join(__dirname, "..", "jsonFiles", filename);
  const rawData = fs.readFileSync(filepath, "utf8");
  return JSON.parse(rawData);
}

function writeDataToFile(filename, data) {
  const filepath = path.join(__dirname, "..", "jsonFiles", filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

function updateItemInFile(filename, updatedItem) {
  try {
    const data = readDataFromFile(filename);
    const index = data.findIndex((item) => item.id === updatedItem.id);

    if (index !== -1) {
      data[index] = updatedItem;
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error updating item:", error);
    return false;
  }
}

module.exports = updateItemInFile;

function checkUserExists(userId) {
  const usersData = readDataFromFile("users.json");
  const userIndex = usersData.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return false;
  }
  return true;
}

function updateUserData(userData, newUserData) {
  for (const key in newUserData) {
    if (Object.hasOwnProperty.call(newUserData, key) && key !== "following") {
      const value = newUserData[key];
      userData[key] = value;
    }
  }
  return userData;
}

function updateUserActivity(currentActivity, newActivityKey) {
  return {
    ...currentActivity,
    [new Date().toLocaleString()]: newActivityKey,
  };
}

function getUserName(userId) {
  const usersData = readDataFromFile("users.json");
  const userIndex = usersData.findIndex((user) => user.id === userId);
  const firstName = usersData[userIndex].firstName;
  const lastName = usersData[userIndex].lastName;
  const username = `${firstName} ${lastName}`;
  return username;
}

const toggleStringInArray = (arr, str) => {
  const index = arr.indexOf(str);
  if (index === -1) {
    arr.push(str);
  } else {
    arr = arr.splice(index,1);
  }
};

module.exports = {
  readDataFromFile,
  writeDataToFile,
  checkUserExists,
  updateUserData,
  updateUserActivity,
  getUserName,
  toggleStringInArray,
};
