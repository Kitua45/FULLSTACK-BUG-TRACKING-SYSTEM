// _tests_/bugs.service.test.ts
import { BugsService } from "../src/services/bugs.services";
import { Bug } from "../src/Types/bugs.types";

jest.mock("../src/Repositories/bugs.repository"); // Mocking the repository

import { BugsRepository } from "../src/Repositories/bugs.repository";

describe("BugsService", () => {
  let service: BugsService;
  let repoMock: jest.Mocked<BugsRepository>;

  beforeEach(() => {
    service = new BugsService();
    repoMock = (service as any).repo as jest.Mocked<BugsRepository>;
    jest.clearAllMocks();
  });

  
  // createBug - folloing the types and repo
  
  it("should create a bug successfully", async () => {
    const payload: Bug = {
      projectid: 1,
      reported_by: 2,
      title: "Sample bug",
      severity: "low",
      status: "open",
    };

    const savedBug: Bug = { ...payload, bugid: 1, created_at: new Date(), updated_at: new Date() };

    (repoMock.create as jest.Mock).mockResolvedValue(savedBug as unknown as ReturnType<typeof repoMock.create>);


    const result = await service.createBug(payload);
    expect(result).toEqual(savedBug);
    expect(repoMock.create).toHaveBeenCalledWith(expect.objectContaining({
      ...payload,
      status: "open",
      severity: "low",
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));
  });

  it("should throw error if title is missing or too short", async () => {
    const payload = { projectid: 1, reported_by: 2, title: "", severity: "low", status: "open" } as Bug;
    await expect(service.createBug(payload)).rejects.toThrow("Title is required and must be at least 3 characters");
  });

  it("should throw error if projectid is missing", async () => {
    const payload = { reported_by: 2, title: "Bug", severity: "low", status: "open" } as Bug;
    await expect(service.createBug(payload)).rejects.toThrow("Project ID is required");
  });

  
  // getAllBugs
  
  it("should return all bugs", async () => {
    const bugs: Bug[] = [
      { bugid: 1, projectid: 1, reported_by: 2, title: "Bug 1", severity: "low", status: "open" },
      { bugid: 2, projectid: 1, reported_by: 3, title: "Bug 2", severity: "medium", status: "in_progress" },
    ];
    repoMock.getAllBugs.mockResolvedValue(bugs);

    const result = await service.getAllBugs();
    expect(result).toEqual(bugs);
    expect(repoMock.getAllBugs).toHaveBeenCalledTimes(1);
  });

  
  // getBug
  
  it("should get a bug by id", async () => {
    const bug: Bug = { bugid: 1, projectid: 1, reported_by: 2, title: "Bug 1", severity: "low", status: "open" };
    repoMock.findById.mockResolvedValue(bug);

    const result = await service.getBug(1);
    expect(result).toEqual(bug);
    expect(repoMock.findById).toHaveBeenCalledWith(1);
  });

  it("should throw error if bug not found", async () => {
    repoMock.findById.mockResolvedValue(null);
    await expect(service.getBug(999)).rejects.toThrow("Bug with ID 999 not found");
  });

  it("should throw error if invalid bugid", async () => {
    await expect(service.getBug(0)).rejects.toThrow("Invalid bug ID");
  });

  
  // listByProject
  
  it("should return bugs by project", async () => {
    const bugs: Bug[] = [
      { bugid: 1, projectid: 1, reported_by: 2, title: "Bug 1", severity: "low", status: "open" },
    ];
    repoMock.findAllByProject.mockResolvedValue(bugs);

    const result = await service.listByProject(1);
    expect(result).toEqual(bugs);
    expect(repoMock.findAllByProject).toHaveBeenCalledWith(1);
  });

  it("should throw error if no bugs found for project", async () => {
    repoMock.findAllByProject.mockResolvedValue([]);
    await expect(service.listByProject(1)).rejects.toThrow("No bugs found for project ID 1");
  });

  it("should throw error for invalid projectid", async () => {
    await expect(service.listByProject(0)).rejects.toThrow("Invalid project ID");
  });

  
  // updateBug
  
  it("should update a bug successfully", async () => {
    repoMock.update.mockResolvedValue(undefined);

    const updates: Partial<Bug> = { status: "resolved" };
    await service.updateBug(1, updates);

    expect(repoMock.update).toHaveBeenCalledWith(1, updates);
  });

  it("should throw error for invalid status", async () => {
    const updates: Partial<Bug> = { status: "invalid_status" as any };
    await expect(service.updateBug(1, updates)).rejects.toThrow("Invalid status value");
  });

  it("should throw error for invalid bugid on update", async () => {
    await expect(service.updateBug(0, { status: "open" })).rejects.toThrow("Invalid bug ID");
  });

  
  // deleteBug
  
  it("should delete a bug successfully", async () => {
    const bug: Bug = { bugid: 1, projectid: 1, reported_by: 2, title: "Bug 1", severity: "low", status: "open" };
    repoMock.findById.mockResolvedValue(bug);
    repoMock.delete.mockResolvedValue(undefined);

    await service.deleteBug(1);
    expect(repoMock.delete).toHaveBeenCalledWith(1);
  });

  it("should throw error if bug does not exist on delete", async () => {
    repoMock.findById.mockResolvedValue(null);
    await expect(service.deleteBug(999)).rejects.toThrow("Cannot delete — Bug with ID 999 does not exist");
  });

  it("should throw error for invalid bugid on delete", async () => {
    await expect(service.deleteBug(0)).rejects.toThrow("Invalid bug ID");
  });
});
