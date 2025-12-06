import * as repo from "../Repositories/projects.repository";
import { Project, NewProject, UpdateProject } from "../Types/projects.types";

// List all projects
export const listProjects = async (): Promise<Project[]> => {
  return await repo.getAllProjects();
};

// Get single project
export const getProject = async (id: number): Promise<Project> => {
  if (!id || isNaN(id)) throw new Error("Invalid projectid");
  const project = await repo.getProjectById(id);
  if (!project) throw new Error("Project not found");
  return project;
};

// Create new project
export const createNewProject = async (project: NewProject): Promise<{ message: string; project: Project }> => {
  if (!project.title) throw new Error("Project title is required");
  const createdProject = await repo.createNewProject(project);
  return { message: "Project created successfully", project: createdProject };
};

// Update project
export const updateProject = async (id: number, projectData: UpdateProject): Promise<{ message: string; project: Project }> => {
  if (!projectData || Object.keys(projectData).length === 0) throw new Error("No data provided for update");
  const updatedProject = await repo.updateProject(id, projectData);
  if (!updatedProject) throw new Error("Project not found");
  return { message: "Project updated successfully", project: updatedProject };
};

// Delete project
export const deleteProject = async (id: number): Promise<{ message: string; project: Project }> => {
  const deletedProject = await repo.deleteProject(id);
  if (!deletedProject) throw new Error("Project not found");
  return { message: "Project deleted successfully", project: deletedProject };
};
