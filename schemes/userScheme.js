const userSchema = {
  id: {
    type: "number",
  },
  username: {
    type: "string",
  },
  password: {
    type: "string",
  },
  isAdmin: {
    type: "boolean",
  },
  firstName: {
    type: "string",
  },
  lastName: {
    type: "string",
  },
};

module.exports = userSchema;
