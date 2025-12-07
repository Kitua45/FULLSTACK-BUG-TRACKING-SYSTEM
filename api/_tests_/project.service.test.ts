import * as repo from "../src/Repositories/projects.repository";
import { Project, NewProject, UpdateProject } from "../src/Types/projects.types";
import * as projectService from "../src/services/project.service";

jest.mock("../src/Repositories/projects.repository"); // Mock repository

beforeEach(() => {
  jest.clearAllMocks(); // Reset mocks before each test
});

describe("Project Service Tests", () => {
  
  // listProjects
  
  it("should return a list of projects", async () => {
    const mockProjects: Project[] = [
      { projectid: 1, title: "Project A", description: "Desc A", created_by: 1, created_at: new Date() },
      { projectid: 2, title: "Project B", description: "Desc B", created_by: 2, created_at: new Date() }
    ];

    (repo.getAllProjects as jest.Mock).mockResolvedValue(mockProjects);

    const projects = await projectService.listProjects();
    expect(projects).toEqual(mockProjects);
    expect(repo.getAllProjects).toHaveBeenCalledTimes(1);
  });

   
  // createNewProject test
  
it("should create a new project successfully", async () => {
  const newProject: NewProject = { 
    title: "New Project", 
    description: "New Desc", 
    created_by: 1, 
    created_at: new Date() 
  };

  const createdProject: Project = { 
    projectid: 1, 
    title: newProject.title,
    description: newProject.description,
    created_by: newProject.created_by,
    created_at: newProject.created_at! // ! ensuring its not left null
  };

  (repo.createNewProject as jest.Mock).mockResolvedValue(createdProject);

  const result = await projectService.createNewProject(newProject);
  expect(result).toEqual({ message: "Project created successfully", project: createdProject });
  expect(repo.createNewProject).toHaveBeenCalledWith(newProject);
});

it("should throw error if project title is missing", async () => {
  const newProject = { title: "", description: "Desc", created_by: 1 } as NewProject;
  await expect(projectService.createNewProject(newProject)).rejects.toThrow("Project title is required");
});
  // updateProject
  
  it("should update a project successfully", async () => {
    const updateData: UpdateProject = { title: "Updated Project" };
    const updatedProject: Project = { projectid: 1, title: "Updated Project", description: "Desc A", created_by: 1, created_at: new Date() };

    (repo.updateProject as jest.Mock).mockResolvedValue(updatedProject);

    const result = await projectService.updateProject(1, updateData);
    expect(result).toEqual({ message: "Project updated successfully", project: updatedProject });
    expect(repo.updateProject).toHaveBeenCalledWith(1, updateData);
  });

    // deleteProject
  
  it("should delete a project successfully", async () => {
    const deletedProject: Project = { projectid: 1, title: "Project A", description: "Desc A", created_by: 1, created_at: new Date() };
    (repo.deleteProject as jest.Mock).mockResolvedValue(deletedProject);

    const result = await projectService.deleteProject(1);
    expect(result).toEqual({ message: "Project deleted successfully", project: deletedProject });
    expect(repo.deleteProject).toHaveBeenCalledWith(1);
  });

  it("should throw error if project to delete not found", async () => {
    (repo.deleteProject as jest.Mock).mockResolvedValue(null);
    await expect(projectService.deleteProject(999)).rejects.toThrow("Project not found");
  });


});