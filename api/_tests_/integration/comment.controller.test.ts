import request from "supertest";
import app from "../../src/index"; 
import { getPool } from "../../src/db/config";

let pool: any;
let commentId: number;     
const bugId = 4;           
const userId = 12;         

beforeAll(async () => {
  pool = await getPool();
});

afterAll(async () => {
  // Clean up in case the comment still exists
  if (commentId) {
    await pool.request()
      .input("commentid", commentId)
      .query("DELETE FROM Comments WHERE commentid = @commentid");
  }
  await pool.close();
});

describe("Comments API Positive Integration Tests (Full Flow)", () => {

  it("should create a new comment", async () => {
    const payload = {
      bugid: bugId,
      userid: userId,
      content: "This is a test comment"
    };

    const res = await request(app)
      .post("/comments")
      .send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Comment created successfully");
    expect(res.body.comment).toHaveProperty("commentid");

    commentId = res.body.comment.commentid;
  });

  it("should get all comments for the bug", async () => {
    const res = await request(app).get(`/comments/bug/${bugId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((c: any) => c.commentid === commentId)).toBe(true);
  });

  it("should update the comment content", async () => {
    const res = await request(app)
      .put(`/comments/${commentId}`)
      .send({ content: "Updated test comment" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Comment updated successfully");
    expect(res.body.comment.content).toBe("Updated test comment");

  //verify update in DB
    const updated = await pool.request()
      .input("commentid", commentId)
      .query("SELECT * FROM Comments WHERE commentid = @commentid");
    expect(updated.recordset[0].content).toBe("Updated test comment");
  });

  it("should delete the comment", async () => {
    const res = await request(app).delete(`/comments/${commentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Comment deleted successfully");

    // Ensure comment is deleted in DB
    const deleted = await pool.request()
      .input("commentid", commentId)
      .query("SELECT * FROM Comments WHERE commentid = @commentid");
    expect(deleted.recordset.length).toBe(0);
  });

  describe("Comments API Negative Integration Tests", () => {

  it("should fail to create a comment with missing fields", async () => {
    const payload = {
      bugid: bugId,
      // userid missing
      content: "" // empty content
    };

    const res = await request(app)
      .post("/comments")
      .send(payload);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/Missing required fields/i);
  });



 

  it("should fail to update with no data provided", async () => {
    // create a valid comment to test empty update
    const createRes = await request(app)
      .post("/comments")
      .send({ bugid: bugId, userid: userId, content: "Temp comment" });

    const tempCommentId = createRes.body.comment.commentid;

    const res = await request(app)
      .put(`/comments/${tempCommentId}`)
      .send({}); // no fields provided

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/No data provided for update/i);

    // Clean up
    await request(app).delete(`/comments/${tempCommentId}`);
  });

it("should fail to delete a non-existing comment", async () => {
  const res = await request(app).delete("/comments/999999"); // non-existing comment
  expect(res.statusCode).toBe(500); // matches your controller
  expect(res.body).toHaveProperty("message", "Error deleting comment");
  expect(res.body).toHaveProperty("error", "Comment not found");
});




});


});

