import { Request, Response } from "express";
import { BugsService } from "../services/bugs.services";
import { Bug } from "../Types/bugs.types";

const service = new BugsService();

export class BugsController {

  // Create new bug
  static async create(req: Request<{}, {}, Bug>, res: Response) {
    try {
      await service.createBug(req.body);
      return res.status(201).json({ message: "Bug created successfully" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Get single bug
  static async get(req: Request<{ id: string }>, res: Response) {
    try {
      const bugid = Number(req.params.id);
      const bug = await service.getBug(bugid);
      return res.status(200).json(bug);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // Get bugs by project
  static async listByProject(req: Request<{ projectid: string }>, res: Response) {
    try {
      const projectid = Number(req.params.projectid);
      const bugs = await service.listByProject(projectid);
      return res.status(200).json(bugs);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // Update bug
  static async update(req: Request<{ id: string }, {}, Partial<Bug>>, res: Response) {
    try {
      const bugid = Number(req.params.id);
      await service.updateBug(bugid, req.body);
      return res.status(200).json({ message: "Bug updated successfully" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Delete bug
  static async remove(req: Request<{ id: string }>, res: Response) {
    try {
      const bugid = Number(req.params.id);
      await service.deleteBug(bugid);
      return res.status(200).json({ message: `Bug with ID ${bugid} deleted successfully` });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Get all bugs
  static async getAll(_req: Request, res: Response) {
    try {
      const bugs = await service.getAllBugs();
      return res.status(200).json(bugs);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
