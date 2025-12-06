import { Express } from "express";
import { BugsController } from "../controllers/bugs.controller";

export const bugsRoutes = (app: Express) => {
    app.get("/getbugs/:projectid", BugsController.listByProject);
    app.get("/allbugs", BugsController.getAll);
    app.get("/bugs/:id", BugsController.get);
    app.post("/createbug", BugsController.create);
    app.put("/bugs/:id", BugsController.update);
    app.delete("/bugs/:id", BugsController.remove);
};


