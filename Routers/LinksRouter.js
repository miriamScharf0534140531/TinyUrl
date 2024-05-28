import express from "express";
import linksController from "../Controllers/LinksController.js"

const LinksRouter = express.Router();

LinksRouter.get("/", linksController.getList);
LinksRouter.get("/:id", linksController.getById);
LinksRouter.post("/", linksController.add);
LinksRouter.put("/:id", linksController.update);
LinksRouter.delete("/:id", linksController.delete);

export default LinksRouter;
