import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetAllCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "../../../features/commentsAPI/commentAPI";
import { toast } from "sonner";

interface RootState {
  user: {
    user: {
      userid: number;
      role: string;
      first_name?: string;
    };
  };
}

export default function Comment() {
  const user = useSelector((state: RootState) => state.user.user);

  const [content, setContent] = useState("");
  const [bugid, setBugid] = useState<number | "">("");

  const [openModal, setOpenModal] = useState(false);

  const [createComment, { isLoading: creating }] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const { data: comments, isLoading } = useGetAllCommentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });

  const commentsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  // Handle creating a comment
  const handleCreate = async () => {
    if (!content.trim() || bugid === "") {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await createComment({
        bugid: Number(bugid),
        userid: user.userid,
        content,
      }).unwrap();

      setContent("");
      setBugid("");
      setOpenModal(false);

      toast.success("Comment added!");
    } catch {
      toast.error("Failed to add comment.");
    }
  };

  // Handle deleting a comment
  const handleDelete = async (commentid?: number) => {
    if (!commentid) return;
    try {
      await deleteComment(commentid).unwrap();
      toast.success("Comment deleted!");
    } catch {
      toast.error("Failed to delete comment.");
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-500">Loading comments...</p>;

  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow-md border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-black mb-4">Discussion</h2>

      {/* Add Comment Button */}
      <button
        onClick={() => setOpenModal(true)}
        className="btn bg-green-700 text-white hover:bg-green-800 mb-4"
      >
        + Add Comment
      </button>

      {/* COMMENTS */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 comments-scroll">
        {comments?.length ? (
          comments.map((c) => {
            const isMe = c.userid === user.userid;

            return (
              <div
                key={c.commentid}
                className={`flex items-start gap-2 ${
                  isMe ? "justify-end flex-row-reverse" : "justify-start"
                }`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  {c.first_name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                {/* Message bubble */}
                <div
                  className={`flex flex-col p-3 rounded-xl shadow-sm max-w-lg border ${
                    isMe
                      ? "bg-green-100 text-black border-green-300"
                      : "bg-green-50 text-black border-green-200"
                  }`}
                >
                  <p className="font-semibold text-sm text-green-800">
                    {c.first_name}
                  </p>

                  <p className="mt-1">{c.content}</p>

                  {c.timestamp && (
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(c.timestamp).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Delete for admin */}
                {user.role === "admin" && (
                  <button
                    onClick={() => handleDelete(c.commentid)}
                    className="btn btn-sm btn-error self-start"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 text-center">No comments yet.</p>
        )}

        <div ref={commentsEndRef} />
      </div>

      {/* MODAL FORM */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-300">
            <h3 className="text-xl font-semibold text-green-900 mb-4">
              Add Comment
            </h3>

            {/* BUG ID */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-green-800 mb-1">
                Bug ID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={bugid}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setBugid(Number.isNaN(val) ? "" : val);
                }}
                className="input input-bordered w-full bg-white text-black"
                placeholder="Enter Bug ID"
              />
            </div>

            {/* CONTENT */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-green-800 mb-1">
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                placeholder="Type your comment..."
                className="textarea textarea-bordered w-full bg-white text-black"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenModal(false)}
                className="btn bg-gray-300 text-black hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!content.trim() || bugid === "" || creating}
                className="btn bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {creating ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

