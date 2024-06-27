import express from "express";
import linksController from "../Controllers/LinksController.js"

const LinksRouter = express.Router();

LinksRouter.get("/", linksController.getList);
LinksRouter.get("/:id", linksController.getById);
LinksRouter.post("/:user", linksController.add);
LinksRouter.put("/:id", linksController.update);
LinksRouter.delete("/:id/:user", linksController.delete);
LinksRouter.get("/:id/clicksInfo",linksController.getClickInfoById);

export default LinksRouter;
