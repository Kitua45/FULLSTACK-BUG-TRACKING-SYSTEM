import { Request, Response } from "express";
import * as commentService from "../services/comments.service";

// Get all comments
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error: any) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};

// Get comments by bug ID
export const getCommentsByBugId = async (req: Request, res: Response) => {
  try {
    const bugid = Number(req.params.bugid);
    if (isNaN(bugid)) return res.status(400).json({ message: "Invalid bug ID" });

    const comments = await commentService.getCommentsByBugId(bugid);
    res.status(200).json(comments);
  } catch (error: any) {
    console.error("Error fetching comments by bug ID:", error);
    res.status(500).json({ message: "Error fetching comments by bug ID", error: error.message });
  }
};

// Create a new comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const createdComment = await commentService.createComment(req.body);
    res.status(201).json({ message: "Comment created successfully", comment: createdComment });
  } catch (error: any) {
    console.error("Error creating comment:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update a comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid comment ID" });

    const commentData = req.body;
    const updatedComment = await commentService.updateComment(id, commentData);
    res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
  } catch (error: any) {
    console.error("Error updating comment:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid comment ID" });

    const deletedComment = await commentService.deleteComment(id);
    res.status(200).json({ message: "Comment deleted successfully", comment: deletedComment });
  } catch (error: any) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
};
