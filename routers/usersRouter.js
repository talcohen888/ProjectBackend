const usersRouter = require("express").Router();
const { usersController } = require('../controllers/usersController');

const getUsersRouter = () => {
    usersRouter.post("/", usersController.addUser);
    usersRouter.get("/", usersController.getAllUsers);
    usersRouter.put("/activity/:id", usersController.addUserActivity);
    usersRouter.put("/:id", usersController.updateUser);

    usersRouter.get("/user", usersController.getActiveUser);
    usersRouter.post("/register", usersController.register);
    usersRouter.post("/login", usersController.login);
    usersRouter.post("/logout", usersController.logout);
    usersRouter.post("/follow", usersController.followUser);
    usersRouter.post("/unfollow", usersController.unfollowUser);

    return usersRouter;
}

module.exports = getUsersRouter;
