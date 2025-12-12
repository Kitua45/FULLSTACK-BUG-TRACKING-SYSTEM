
// src/features/auth/createUserAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { NewUser } from "../auth/authTypes";

export const createUserAPI = createApi({
  reducerPath: "createUserAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }), // your backend URL
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    createUser: builder.mutation<{ message: string }, NewUser>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useCreateUserMutation } = createUserAPI;
