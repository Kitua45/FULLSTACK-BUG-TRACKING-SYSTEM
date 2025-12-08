import request from "supertest";
import app from "../../src/index"; 

describe("Bugs Integration Tests", () => {
  let createdBugId: number; 
  const testProjectId = 1; // project already in DB

  //  CREATING BUG

  it("should create a new bug successfully", async () => {
    const payload = {
      projectid: testProjectId,
      reported_by: 12,
      assigned_to: 5,
      title: "New bug from test",
      description: "This bug is created by tests",
      severity: "low",
      status: "open"
    };

    const res = await request(app)
      .post("/createbug")
      .send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Bug created successfully");

    //  fetching all bugs to get the new ID
    const listRes = await request(app).get(`/getbugs/${testProjectId}`);

    expect(listRes.statusCode).toBe(200);
    expect(listRes.body.length).toBeGreaterThan(0);

    // finding the one  just created (highest ID or matching title)
 const created = listRes.body.find((b: any) => b.title === "New bug from test");


    expect(created).toBeDefined();
    createdBugId = created.bugid;
  });

 
  //  GET BUGS BY PROJECT ID
 
  it("should fetch bugs by project ID", async () => {
    const res = await request(app).get(`/getbugs/${testProjectId}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const found = res.body.some((b: any) => b.bugid === createdBugId);
    expect(found).toBe(true);
  });

  //  UPDATE BUG
 
  it("should update a bug successfully", async () => {
    const res = await request(app)
      .put(`/bugs/${createdBugId}`)
      .send({ status: "in_progress" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Bug updated successfully");

    
  });

 
  //  DELETE BUG
  
  it("should delete a bug successfully", async () => {
    const res = await request(app).delete(`/bugs/${createdBugId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      `Bug with ID ${createdBugId} deleted successfully`
    );

   
  });

  // Negative Tests
  describe("Bugs Integration Tests - Negative Cases", () => {

  // CREATE BUG — missing project ID
  it("should fail to create a bug when project ID is missing", async () => {
    const payload = {
      // projectid missing
      reported_by: 12,
      assigned_to: 5,
      title: "Bug without project",
      description: "Missing project ID",
      severity: "low",
      status: "open"
    };

    const res = await request(app)
      .post("/createbug")
      .send(payload);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Project ID is required");
  });

  //  GET BUGS BY PROJECT — invalid ID
  it("should fail to fetch bugs with invalid project ID", async () => {
    const res = await request(app).get("/getbugs/0"); // invalid ID

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Invalid project ID");
  });

  //  UPDATE BUG — invalid status
  it("should fail to update a bug with invalid status value", async () => {
    const res = await request(app)
      .put("/bugs/4")
      .send({ status: "INVALID_STATUS" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid status value");
  });

  //  DELETE BUG — non-existing bug ID
  it("should fail to delete a non-existing bug", async () => {
    const res = await request(app).delete("/bugs/999999"); // ID does not exist

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Cannot delete — Bug with ID 999999 does not exist");
  });

});


});
