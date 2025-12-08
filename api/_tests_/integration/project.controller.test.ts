
import request from "supertest";
import app from "../../src/index"; 
import { getPool } from "../../src/db/config";

let pool: any;
let projectId: number;

beforeAll(async () => {
  pool = await getPool(); // DB connection
});

afterAll(async () => {
  // clean up: deleting the test project if it still exists
  if (projectId) {
    await pool.request().input("id", projectId).query(`DELETE FROM Projects WHERE projectid = @id`);
  }
  await pool.close();
});

describe("Projects API Integration Tests", () => {

  it("should create a new project", async () => {
    const payload = {
      title: "Barua System",
      description: "smart communication",
      status: "active",
      created_by: 5 
    };

    const res = await request(app).post("/projects").send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Project created successfully");
    expect(res.body.project).toHaveProperty("projectid");
    expect(res.body.project.title).toBe(payload.title);

    projectId = res.body.project.projectid; // save for next tests
  });

  it("should get the project by ID", async () => {
    const res = await request(app).get(`/projects/${projectId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.projectid).toBe(projectId);
    expect(res.body.title).toBe("Barua System");
  });

  it("should update the project title", async () => {
    const updatePayload = { title: "Updated Barua System" };
    const res = await request(app).put(`/projects/${projectId}`).send(updatePayload);

    expect(res.statusCode).toBe(200);
    expect(res.body.project.title).toBe(updatePayload.title);
    expect(res.body.message).toBe("Project updated successfully");
  });

  it("should delete the project", async () => {
    const res = await request(app).delete(`/projects/${projectId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.project.projectid).toBe(projectId);
    expect(res.body.message).toBe("Project deleted successfully");

   
  });
});


//negative tests
;

describe("Projects API Negative Tests", () => {

  it("should fail to create a project without a title", async () => {
    const payload = {
      description: "No title provided",
      status: "active",
      created_by: 1
    };

    const res = await request(app).post("/projects").send(payload);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Project title is required");
  });



  

  it("should fail to get a project that does not exist", async () => {
    const res = await request(app).get("/projects/99"); // non-existent ID
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Project not found");
  });

  it("should fail to update a project with no data", async () => {
    const res = await request(app).put("/projects/1").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "No fields provided for update");
  });

  it("should fail to update a project that does not exist", async () => {
    const res = await request(app).put("/projects/9999").send({ title: "Updated" });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Project not found");
  });


 

});