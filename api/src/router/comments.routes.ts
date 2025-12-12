import { Express } from "express";
import * as commentController from "../controllers/comments.controllers";

const commentRoutes = (app:Express) => {

// Routes for Comments
// Get all comments
app.get("/comments", commentController.getAllComments);

// Get comments for a specific bug
app.get("/comments/bug/:bugid", commentController.getCommentsByBugId);

// Create a comment
app.post("/comments", commentController.createComment);                    

// Update a comment
app.put("/comments/:id", commentController.updateComment);

// Delete a comment
app.delete("/comments/:id", commentController.deleteComment);
}
export default commentRoutes ;

