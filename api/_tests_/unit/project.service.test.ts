import * as ProjectRepository from "../../src/Repositories/projects.repository";
import { Project, NewProject, UpdateProject } from "../../src/Types/projects.types";
import * as ProjectService from "../../src/services/project.service";

jest.mock("../../src/Repositories/projects.repository"); // Mock repository

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

    (ProjectRepository.getAllProjects as jest.Mock).mockResolvedValue(mockProjects);

    const projects = await ProjectService.listProjects();
    expect(projects).toEqual(mockProjects);
    expect(ProjectRepository.getAllProjects).toHaveBeenCalledTimes(1);
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

  (ProjectRepository.createNewProject as jest.Mock).mockResolvedValue(createdProject);

  const result = await ProjectService.createNewProject(newProject);
  expect(result).toEqual({ message: "Project created successfully", project: createdProject });
  expect(ProjectRepository.createNewProject).toHaveBeenCalledWith(newProject);
});

it("should throw error if project title is missing", async () => {
  const newProject = { title: "", description: "Desc", created_by: 1 } as NewProject;
  await expect(ProjectService.createNewProject(newProject)).rejects.toThrow("Project title is required");
});
  // updateProject
  
  it("should update a project successfully", async () => {
    const updateData: UpdateProject = { title: "Updated Project" };
    const updatedProject: Project = { projectid: 1, title: "Updated Project", description: "Desc A", created_by: 1, created_at: new Date() };

    (ProjectRepository.updateProject as jest.Mock).mockResolvedValue(updatedProject);

    const result = await ProjectService.updateProject(1, updateData);
    expect(result).toEqual({ message: "Project updated successfully", project: updatedProject });
    expect(ProjectRepository.updateProject).toHaveBeenCalledWith(1, updateData);
  });

    // deleteProject
  
  it("should delete a project successfully", async () => {
    const deletedProject: Project = { projectid: 1, title: "Project A", description: "Desc A", created_by: 1, created_at: new Date() };
    (ProjectRepository.deleteProject as jest.Mock).mockResolvedValue(deletedProject);

    const result = await ProjectService.deleteProject(1);
    expect(result).toEqual({ message: "Project deleted successfully", project: deletedProject });
    expect(ProjectRepository.deleteProject).toHaveBeenCalledWith(1);
  });

  it("should throw error if project to delete not found", async () => {
    (ProjectRepository.deleteProject as jest.Mock).mockResolvedValue(null);
    await expect(ProjectService.deleteProject(999)).rejects.toThrow("Project not found");
  });


});