import * as commentService from "../src/services/comments.service";
import { CommentsRepository } from "../src/Repositories/comments.repository";
import { Comment } from "../src/Types/comments.types";

// Mocking the entire repository class
jest.mock("../src/Repositories/comments.repository");

describe("Comments Service Tests", () => {
  let repoMockInstance: jest.Mocked<CommentsRepository>;

  beforeEach(() => {
    // Get the mocked instance of CommentsRepository
    repoMockInstance = new CommentsRepository() as jest.Mocked<CommentsRepository>;
    jest.clearAllMocks();
  });

  it("should return all comments", async () => {
    const mockComments: Comment[] = [
      { commentid: 1, bugid: 1, userid: 2, content: "First comment", timestamp: new Date() },
      { commentid: 2, bugid: 1, userid: 3, content: "Second comment", timestamp: new Date() },
    ];

    repoMockInstance.getAllComments.mockResolvedValue(mockComments);

    const result = await commentService.getAllComments();
    expect(result).toEqual(mockComments);
    expect(repoMockInstance.getAllComments).toHaveBeenCalledTimes(1);
  });

  it("should return comments for a specific bug ID", async () => {
    const mockComments: Comment[] = [
      { commentid: 1, bugid: 1, userid: 2, content: "Bug comment", timestamp: new Date() },
    ];

    repoMockInstance.getCommentsByBugId.mockResolvedValue(mockComments);

    const result = await commentService.getCommentsByBugId(1);
    expect(result).toEqual(mockComments);
    expect(repoMockInstance.getCommentsByBugId).toHaveBeenCalledWith(1);
  });

  it("should create a new comment successfully", async () => {
    const payload: Omit<Comment, "commentid" | "timestamp"> = {
      bugid: 1,
      userid: 2,
      content: "New comment",
    };

    const savedComment: Comment = { ...payload, commentid: 1, timestamp: new Date() };

    repoMockInstance.createComment.mockResolvedValue(savedComment);

    const result = await commentService.createComment(payload);
    expect(result).toEqual(savedComment);
    expect(repoMockInstance.createComment).toHaveBeenCalledWith(payload);
  });

  it("should update a comment successfully", async () => {
    const id = 1;
    const commentData = { content: "Updated comment" };
    const existingComment: Comment = { commentid: id, bugid: 1, userid: 2, content: "Old", timestamp: new Date() };
    const updatedComment: Comment = { ...existingComment, ...commentData };

    repoMockInstance.getCommentById.mockResolvedValue(existingComment);
    repoMockInstance.updateComment.mockResolvedValue(updatedComment);

    const result = await commentService.updateComment(id, commentData);
    expect(result).toEqual(updatedComment);
    expect(repoMockInstance.updateComment).toHaveBeenCalledWith(id, commentData);
  });
//deleting comment
  it("should delete a comment successfully", async () => {
    const deletedComment: Comment = { commentid: 1, bugid: 1, userid: 2, content: "Deleted", timestamp: new Date() };

    repoMockInstance.deleteComment.mockResolvedValue(deletedComment);

    const result = await commentService.deleteComment(1);
    expect(result).toEqual(deletedComment);
    expect(repoMockInstance.deleteComment).toHaveBeenCalledWith(1);
  });
});
