import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetAllCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "../../../../features/commentsAPI/commentAPI";
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
  // ✔ Replaced `any` with RootState — nothing else touched
  const user = useSelector((state: RootState) => state.user.user);

  const [content, setContent] = useState("");
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

  const handleCreate = async () => {
    if (!content.trim()) return;
    try {
      await createComment({
        bugid: 0,
        userid: user.userid,
        content,
      }).unwrap();

      setContent("");
      toast.success("Comment added!");
    } catch {
      toast.error("Failed to add comment.");
    }
  };

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

      {/* COMMENTS */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 comments-scroll">
        {comments?.length ? (
          comments.map((c) => {
            const isMe = c.userid === user?.userid;

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
                {user?.role === "admin" && (
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

      {/* ADD COMMENT */}
      <div className="mt-4 flex flex-col md:flex-row items-center gap-2">
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          rows={1}
          placeholder="Write a comment..."
          className="textarea textarea-bordered w-full resize-none bg-white text-black border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-150"
        />

        <button
          onClick={handleCreate}
          disabled={creating || !content.trim()}
          className="btn bg-green-600 text-white hover:bg-green-700 md:w-auto w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
        >
          {creating ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
