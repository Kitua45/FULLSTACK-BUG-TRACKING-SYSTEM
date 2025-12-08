import { Request, Response } from "express";
import * as projectServices from '../services/project.service';


// GET ALL PROJECTS

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectServices.listProjects();
    res.status(200).json(projects);
  } catch (error: any) {
    console.error("Error fetching all projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET PROJECT BY ID

export const getProjectById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const project = await projectServices.getProject(id);
    res.status(200).json(project);
  } catch (error: any) {
    if (error.message === "Project not found") {
      res.status(404).json({ message: "Project not found" });
    } else {
      console.error("Error fetching project by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};


// CREATE NEW PROJECT


export const createNewProject = async (req: Request, res: Response) => {
  const projectData = req.body;

  try {
    const result = await projectServices.createNewProject(projectData);
    return res.status(201).json(result); // return 201 Created
  } catch (error: any) {
    console.error("Error creating project:", error.message || error);
    
    // Differentiate between validation errors and server errors
    if (error.message && error.message.includes("required")) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};


// UPDATE PROJECT

export const updateProject = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const projectData = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const result = await projectServices.updateProject(id, projectData);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Project not found") {
      res.status(404).json({ message: "Project not found" });
    } else if (error.message === "No data provided for update") {
      res.status(400).json({ message: "No fields provided for update" });
    } else {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};


// DELETE PROJECT

export const deleteProject = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const result = await projectServices.deleteProject(id);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Project not found") {
      res.status(404).json({ message: "Project not found" });
    } else {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
