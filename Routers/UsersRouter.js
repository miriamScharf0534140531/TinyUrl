import express from "express";
import usersController from "../Controllers/UsersController.js"

const UsersRouter = express.Router();

UsersRouter.get("/", usersController.getList);
UsersRouter.get("/:id", usersController.getById);
UsersRouter.put("/:id", usersController.update);
UsersRouter.delete("/:id", usersController.delete);
UsersRouter.get('/:userId/links',usersController.getByUserId);

export default UsersRouter;
