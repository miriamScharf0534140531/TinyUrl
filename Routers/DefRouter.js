import express from "express";

import defController from "../Controllers/DefController.js";

const DefRouter = express.Router();

DefRouter.post("/login", defController.login);
DefRouter.post("/register",defController.register);
DefRouter.get("/:id", defController.getById);
DefRouter.get('/',(req, res)=>{ res.send('Hello World!')})
export default DefRouter;
