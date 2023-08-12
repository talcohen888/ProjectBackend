const { checkUserExists } = require("./utils");

function canFollowUser(userId, followedUserId) {
  if (userId === followedUserId) {
    return "User cannot follow itself";
  }

  const followingUserExists = checkUserExists(followedUserId);
  if (!followingUserExists) {
    return "Trying to follow non-existing user";
  }

  return;
}

function updateFollowingArray(followedUserId, followingArray) {
  if (!followingArray.includes(followedUserId)) {
    followingArray.push(followedUserId);
  }

  return followingArray;
}

module.exports = { canFollowUser, updateFollowingArray };
