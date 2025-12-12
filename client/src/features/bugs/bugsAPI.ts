import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

// Bug type matching backend
export type TBug = {
  bugid: number;
  projectid: number;
  reported_by: number;
  assigned_to?: number | null;
  title: string;
  description?: string | null;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "resolved" | "closed";
  created_at?: string;
  updated_at?: string;
};

// Payload type for creating a bug
export type CreateBugDTO = Omit<TBug, "bugid" | "created_at" | "updated_at">;

export const bugsAPI = createApi({
  reducerPath: "bugsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  tagTypes: ["Bugs"],
  endpoints: (builder) => ({
    // Get all bugs
    getAllBugs: builder.query<TBug[], void>({
      query: () => "/allbugs",
      providesTags: ["Bugs"],
    }),

    // Get bugs by project
    getBugsByProject: builder.query<TBug[], number>({
      query: (projectid) => `/getbugs/${projectid}`,
      providesTags: ["Bugs"],
    }),

    // Create a new bug
    createBug: builder.mutation<TBug, CreateBugDTO>({
      query: (newBug) => ({
        url: "/createbug",
        method: "POST",
        body: newBug,
      }),
      invalidatesTags: ["Bugs"], // So lists refresh automatically
    }),
  }),
});

export const {
  useGetAllBugsQuery,
  useGetBugsByProjectQuery,
  useCreateBugMutation, 
} = bugsAPI;

export default bugsAPI;
