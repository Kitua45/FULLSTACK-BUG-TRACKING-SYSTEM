import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

// Project type returned from API
export type TProject = {
  message: string;
  projectid: number;
  title: string;
  description?: string;
  status: "active" | "inactive";  // restricted
  created_by: number;
  created_at?: string;
};

// Type used for creating or updating a project
export type NewProject = {
  title: string;
  description?: string;
  status: "active" | "inactive"; // restricted
  created_by: number;
  projectid?: number; // optional for creation
};

export const projectsAPI = createApi({
  reducerPath: "projectsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    // Create Project
    createProject: builder.mutation<{ message: string }, Partial<NewProject>>({
      query: (newProject) => ({
        url: "/projects",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Projects"],
    }),

    // Get all projects
    getProjects: builder.query<TProject[], void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),

    // Get project by ID
    getProjectById: builder.query<TProject, number>({
      query: (id) => `/projects/${id}`,
    }),

    // Update project
   updateProject: builder.mutation<
  { message: string },
  Partial<NewProject> & { id: number }  // id required by backend
>({
  query: (project) => ({
    url: `/projects/${project.id}`, // use id here
    method: "PUT",
    body: project, // payload includes id
  }),
  invalidatesTags: ["Projects"],
}),

    // Delete project
    deleteProject: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsAPI;

export default projectsAPI;

