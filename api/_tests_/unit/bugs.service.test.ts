import * as BugsRepo  from "../../src/Repositories/bugs.repository";
import { Bug } from "../../src/Types/bugs.types";
import { BugsService } from "../../src/services/bugs.services";



jest.mock("../../src/Repositories/bugs.repository");

const bugsService = new BugsService();

describe("Bugs Service Test Suite", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a bug successfully", async () => {
    const payload: Bug = {
      projectid: 1,
      title: "Sample bug",
      reported_by: 2,
      severity: "low",
      status: "open",
    };

    const savedBug: Bug = {
      ...payload,
      bugid: 10,
      created_at: new Date(),
      updated_at: new Date(),
    };

    (BugsRepo.BugsRepository.prototype.create as jest.Mock).mockResolvedValue(savedBug);

    const result = await bugsService.createBug(payload);

    expect(result).toEqual(savedBug);
    expect(BugsRepo.BugsRepository.prototype.create).toHaveBeenCalledWith(
      expect.objectContaining({
        projectid: 1,
        title: "Sample bug",
        reported_by: 2,
        severity: "low",
        status: "open",
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })
    );
  });

  it("should throw if title is missing or too short", async () => {
    const payload = { projectid: 1, title: "" } as Bug;
    await expect(bugsService.createBug(payload)).rejects.toThrow(
      "Title is required and must be at least 3 characters"
    );
  });

  it("should throw if projectid is missing", async () => {
    const payload = { projectid: 0, title: "Bug" } as Bug;
    await expect(bugsService.createBug(payload)).rejects.toThrow(
      "Project ID is required"
    );
  });

  it("should return all bugs", async () => {
    const bugs: Bug[] = [
      { bugid: 1, projectid: 1, title: "Bug1", reported_by: 1 },
      { bugid: 2, projectid: 1, title: "Bug2", reported_by: 2 },
    ] as any;

    (BugsRepo.BugsRepository.prototype.getAllBugs as jest.Mock).mockResolvedValue(bugs);

    const result = await bugsService.getAllBugs();

    expect(result).toEqual(bugs);
    expect(BugsRepo.BugsRepository.prototype.getAllBugs).toHaveBeenCalledTimes(1);
  });

  it("should get a bug by ID", async () => {
    const bug: Bug = {
      bugid: 3,
      projectid: 1,
      title: "Bug A",
      reported_by: 1,
      severity: "medium",
      status: "resolved",
      created_at: expect.any(Date),
        updated_at: expect.any(Date),


    };

    (BugsRepo.BugsRepository.prototype.findById as jest.Mock).mockResolvedValue(bug);

    const result = await bugsService.getBug(3);

    expect(result).toEqual(bug);
    expect(BugsRepo.BugsRepository.prototype.findById).toHaveBeenCalledWith(3);
  });

  it("should throw if bug does not exist", async () => {
    (BugsRepo.BugsRepository.prototype.findById as jest.Mock).mockResolvedValue(null);

    await expect(bugsService.getBug(999)).rejects.toThrow(
      "Bug with ID 999 not found"
    );
  });

  it("should throw if invalid bug ID", async () => {
    await expect(bugsService.getBug(0)).rejects.toThrow("Invalid bug ID");
  });

  it("should list bugs by project", async () => {
    const bugs: Bug[] = [
      { bugid: 1, projectid: 2, title: "Bug X", reported_by: 1 },
    ] as any;

    (BugsRepo.BugsRepository.prototype.findAllByProject as jest.Mock).mockResolvedValue(bugs);

    const result = await bugsService.listByProject(2);

    expect(result).toEqual(bugs);
    expect(BugsRepo.BugsRepository.prototype.findAllByProject).toHaveBeenCalledWith(2);
  });

  it("should throw if no bugs found for project", async () => {
    (BugsRepo.BugsRepository.prototype.findAllByProject as jest.Mock).mockResolvedValue([]);

    await expect(bugsService.listByProject(10)).rejects.toThrow(
      "No bugs found for project ID 10"
    );
  });

  it("should throw for invalid project ID", async () => {
    await expect(bugsService.listByProject(0)).rejects.toThrow("Invalid project ID");
  });

it("should update a bug successfully", async () => {
  (BugsRepo.BugsRepository.prototype.update as jest.Mock).mockResolvedValue(undefined);

  await bugsService.updateBug(1, { status: "resolved" });

  expect(BugsRepo.BugsRepository.prototype.update).toHaveBeenCalledWith(
    1,
    { status: "resolved" }
  );
});


  it("should throw on invalid status", async () => {
    await expect(
      bugsService.updateBug(1, { status: "wrong" } as any)
    ).rejects.toThrow("Invalid status value");
  });

  it("should throw on invalid bug ID for update", async () => {
    await expect(bugsService.updateBug(0, {})).rejects.toThrow("Invalid bug ID");
  });

  it("should delete a bug", async () => {
    (BugsRepo.BugsRepository.prototype.findById as jest.Mock).mockResolvedValue({
      bugid: 1,
      projectid: 1,
      title: "Bug",
      reported_by: 1,
    });

    (BugsRepo.BugsRepository.prototype.delete as jest.Mock).mockResolvedValue(undefined);

    await bugsService.deleteBug(1);

    expect(BugsRepo.BugsRepository.prototype.delete).toHaveBeenCalledWith(1);
  });

  it("should throw when deleting missing bug", async () => {
    (BugsRepo.BugsRepository.prototype.findById as jest.Mock).mockResolvedValue(null);

    await expect(bugsService.deleteBug(999)).rejects.toThrow(
      "Cannot delete — Bug with ID 999 does not exist"
    );
  });

  it("should throw for invalid bug ID on delete", async () => {
    await expect(bugsService.deleteBug(0)).rejects.toThrow("Invalid bug ID");
  });
});
