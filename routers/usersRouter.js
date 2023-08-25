const usersRouter = require("express").Router();
const { usersController } = require('../controllers/usersController');

const getUsersRouter = () => {
    usersRouter.post("/", usersController.addUser);
    usersRouter.get("/", usersController.getAllUsers);
    usersRouter.get("/user", usersController.getActiveUser);
    usersRouter.get("/:id", usersController.getUser);
    usersRouter.get("/suggest/:id", usersController.getFriendsSuggestions);
    usersRouter.put("/activity/:id", usersController.addUserActivity);
    usersRouter.put("/:id", usersController.updateUser);
    usersRouter.delete("/:id", usersController.deleteUser);

    usersRouter.post("/register", usersController.register);
    usersRouter.post("/login", usersController.login);
    usersRouter.post("/logout", usersController.logout);
    usersRouter.post("/follow", usersController.followUser);
    usersRouter.post("/unfollow", usersController.unfollowUser);

    return usersRouter;
}

module.exports = getUsersRouter;
