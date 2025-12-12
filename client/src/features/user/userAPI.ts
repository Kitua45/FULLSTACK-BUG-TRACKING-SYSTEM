import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

// User type
export interface TUser {
  userid: number;
  first_name: string;
  last_name: string;
  email: string;
  role_user: string;
  password_hash: string;
  verification_code: string;
  created_at?: string;
  updated_at?: string | null;
  is_verified?: boolean;
}

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<TUser[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = usersAPI;
export default usersAPI;
