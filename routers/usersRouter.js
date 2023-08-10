const usersRouter = require("express").Router();
const { usersController } = require('../controllers/usersController');

const getUsersRouter = () => {
    usersRouter.post("/", usersController.addUser);
    usersRouter.get("/", usersController.getAllUsers);
    return usersRouter;  // Return the router
}

module.exports = getUsersRouter;
