const usersRouter = require("express").Router();
const { usersController } = require('../controllers/usersController');

const getUsersRouter = () => {
    usersRouter.post("/", usersController.addUser);
    usersRouter.get("/", usersController.getAllUsers);
    usersRouter.put("/activity/:id", usersController.addUserActivity);
    usersRouter.put("/:id", usersController.updateUser);
    
    return usersRouter;
}

module.exports = getUsersRouter;
