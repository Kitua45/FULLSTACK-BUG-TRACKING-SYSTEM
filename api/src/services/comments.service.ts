
import { CommentsRepository } from "../Repositories/comments.repository";
import { Comment, UpdateComment } from "../Types/comments.types";

const repo = new CommentsRepository();

// Fetch all comments
export const getAllComments = async (): Promise<Comment[]> => {
  return await repo.getAllComments();
};

// Fetch comments for a specific bug
export const getCommentsByBugId = async (bugid: number): Promise<Comment[]> => {
  if (isNaN(bugid)) throw new Error("Invalid bug ID");
  return await repo.getCommentsByBugId(bugid);
};

// Fetch a single comment by ID
export const getCommentById = async (id: number): Promise<{ message: string; comment: Comment }> => {
  if (isNaN(id)) throw new Error("Invalid comment ID");

  const comment = await repo.getCommentById(id);
  if (!comment) throw new Error("Comment not found");

  return {
    message: "Comment retrieved successfully",
    comment,
  };
};

// Create a new comment
export const createComment = async (comment: Omit<Comment, "commentid" | "timestamp">): Promise<Comment> => {
  if (!comment.bugid || !comment.userid || !comment.content) {
    throw new Error("Missing required fields: bugid, userid, or content");
  }

  const created = await repo.createComment(comment);
  return created;
};

// Update a comment
export const updateComment = async (id: number, commentData: Partial<UpdateComment>): Promise<Comment> => {
  if (isNaN(id)) throw new Error("Invalid comment ID");
  if (!commentData || Object.keys(commentData).length === 0) throw new Error("No data provided for update");

  const existingComment = await repo.getCommentById(id);
  if (!existingComment) throw new Error("Comment not found");

  const updated = await repo.updateComment(id, commentData);
  return updated;
};

// Delete a comment
export const deleteComment = async (id: number): Promise<Comment> => {
  if (isNaN(id)) throw new Error("Invalid comment ID");

  const deleted = await repo.deleteComment(id);
  return deleted;
};


