import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TProfile } from "../auth/authTypes";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // Get all users
    getUsers: builder.query<TProfile[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    // Get single user by ID
    getUserById: builder.query<TProfile, number>({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),

    // Update user
    updateUser: builder.mutation<TProfile, Partial<TProfile> & { userid: number }>({
      query: ({ userid, ...body }) => ({
        url: `/users/${userid}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// Export hooks for usage in components
export const { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation } = authAPI;


