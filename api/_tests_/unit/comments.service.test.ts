import * as commentService from "../../src/services/comments.service";
import { CommentsRepository } from "../../src/Repositories/comments.repository";
import { Comment } from "../../src/Types/comments.types";

// Mock the entire repository class
jest.mock("../../src/Repositories/comments.repository");

describe("Comments Service Tests", () => {
  let repoMock: jest.Mocked<CommentsRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Force service to use the same mocked prototype functions
    repoMock = CommentsRepository.prototype as jest.Mocked<CommentsRepository>;
  });

  it("should return all comments", async () => {
    const mockComments: Comment[] = [
      { commentid: 1, bugid: 1, userid: 2, content: "First comment", timestamp: new Date() },
      { commentid: 2, bugid: 1, userid: 3, content: "Second comment", timestamp: new Date() },
    ];

    repoMock.getAllComments.mockResolvedValue(mockComments);

    const result = await commentService.getAllComments();

    expect(result).toEqual(mockComments);
    expect(repoMock.getAllComments).toHaveBeenCalledTimes(1);
  });

  it("should return comments for a specific bug ID", async () => {
    const mockComments: Comment[] = [
      { commentid: 1, bugid: 1, userid: 2, content: "Bug comment", timestamp: new Date() },
    ];

    repoMock.getCommentsByBugId.mockResolvedValue(mockComments);

    const result = await commentService.getCommentsByBugId(1);

    expect(result).toEqual(mockComments);
    expect(repoMock.getCommentsByBugId).toHaveBeenCalledWith(1);
  });

  it("should create a new comment successfully", async () => {
    const payload: Omit<Comment, "commentid" | "timestamp"> = {
      bugid: 1,
      userid: 2,
      content: "New comment",
    };

    const savedComment: Comment = {
      ...payload,
      commentid: 1,
      timestamp: new Date(),
    };

    repoMock.createComment.mockResolvedValue(savedComment);

    const result = await commentService.createComment(payload);

    expect(result).toEqual(savedComment);
    expect(repoMock.createComment).toHaveBeenCalledWith(payload);
  });

  it("should update a comment successfully", async () => {
    const id = 1;
    const commentData = { content: "Updated comment" };

    const existingComment: Comment = {
      commentid: id,
      bugid: 1,
      userid: 2,
      content: "Old content",
      timestamp: new Date(),
    };

    const updatedComment: Comment = {
      ...existingComment,
      ...commentData,
    };

    repoMock.getCommentById.mockResolvedValue(existingComment);
    repoMock.updateComment.mockResolvedValue(updatedComment);

    const result = await commentService.updateComment(id, commentData);

    expect(result).toEqual(updatedComment);
    expect(repoMock.updateComment).toHaveBeenCalledWith(id, commentData);
  });

  it("should delete a comment successfully", async () => {
    const deletedComment: Comment = {
      commentid: 1,
      bugid: 1,
      userid: 2,
      content: "Deleted",
      timestamp: new Date(),
    };

    repoMock.deleteComment.mockResolvedValue(deletedComment);

    const result = await commentService.deleteComment(1);

    expect(result).toEqual(deletedComment);
    expect(repoMock.deleteComment).toHaveBeenCalledWith(1);
  });
});
