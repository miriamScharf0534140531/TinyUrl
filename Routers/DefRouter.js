import express from "express";

import defController from "../Controllers/DefController.js";

const DefRouter = express.Router();

DefRouter.post("/login", defController.login);
DefRouter.post("/register",defController.register);
export default DefRouter;
