
import { getPool } from "../db/config";
import { Comment, UpdateComment } from "../Types/comments.types";

export class CommentsRepository {
  private table = "Comments";

  // Fetch all comments
  async getAllComments(): Promise<Comment[]> {
    const pool = await getPool();
    const result = await pool.request().query(`SELECT * FROM ${this.table}`);
    return result.recordset;
  }

  // Get comment by ID
  async getCommentById(commentid: number): Promise<Comment | null> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("commentid", commentid)
      .query(`SELECT * FROM ${this.table} WHERE commentid = @commentid`);
    return result.recordset[0] ?? null;
  }

  // Get comments by bug ID
  async getCommentsByBugId(bugid: number): Promise<Comment[]> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("bugid", bugid)
      .query(`SELECT * FROM ${this.table} WHERE bugid = @bugid ORDER BY timestamp ASC`);
    return result.recordset;
  }

  // Create a new comment
  async createComment(comment: Omit<Comment, "commentid" | "timestamp">): Promise<Comment> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("bugid", comment.bugid)
      .input("userid", comment.userid)
      .input("content", comment.content)
      .query(`
        INSERT INTO ${this.table} (bugid, userid, content, timestamp)
        OUTPUT INSERTED.*
        VALUES (@bugid, @userid, @content, GETDATE())
      `);
    return result.recordset[0];
  }

  // Update a comment
  async updateComment(id: number, commentData: Partial<UpdateComment>): Promise<Comment> {
    const pool = await getPool();
    const request = pool.request();

    const fields = Object.entries(commentData)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        request.input(key, value);
        return `${key} = @${key}`;
      });

    if (fields.length === 0) {
      throw new Error("No fields provided for update");
    }

    request.input("id", id);
    const query = `
      UPDATE ${this.table} 
      SET ${fields.join(", ")}
      OUTPUT INSERTED.*
      WHERE commentid = @id
    `;
    const result = await request.query(query);
    if (!result.recordset[0]) {
      throw new Error("Comment not found");
    }
    return result.recordset[0];
  }

  // Delete a comment
  async deleteComment(commentid: number): Promise<Comment> {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("commentid", commentid)
      .query(`
        DELETE FROM ${this.table}
        OUTPUT DELETED.*
        WHERE commentid = @commentid
      `);
    if (!result.recordset[0]) {
      throw new Error("Comment not found");
    }
    return result.recordset[0];
  }
}
