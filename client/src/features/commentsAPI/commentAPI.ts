import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

// Comment type returned from API
export interface Comment {
  commentid?: number;      // Auto-incremented
  bugid: number;
  userid: number;
  content: string;
  first_name: string;
  timestamp?: string;     
}

// Type used for updating a comment
export interface UpdateComment {
  commentid: number;      
  bugid: number;
  userid: number;
  content: string;
  timestamp?: string;
}

// DTO for creating a comment
export interface CreateCommentDTO {
  bugid: number;
  userid: number;
  content: string;
}

export const commentsAPI = createApi({
  reducerPath: "commentsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    // Get all comments
    getAllComments: builder.query<Comment[], void>({
      query: () => "/comments",
      providesTags: ["Comments"],
    }),

    // Get comments by bug ID
    getCommentsByBugId: builder.query<Comment[], number>({
      query: (bugid) => `/comments/bug/${bugid}`,
      providesTags: ["Comments"],
    }),

    // Create a comment (FIXED)
    createComment: builder.mutation<Comment, CreateCommentDTO>({
      query: (newComment) => ({
        url: "/comments",
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comments"],
    }),

    // Update a comment
    updateComment: builder.mutation<{ message: string }, UpdateComment>({
      query: (comment) => ({
        url: `/comments/${comment.commentid}`,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),

    // Delete a comment
    deleteComment: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetAllCommentsQuery,
  useGetCommentsByBugIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsAPI;

export default commentsAPI;
