import { useState } from "react";
import { projectsAPI, type TProject } from "../../../../features/projects/projectAPI";
import { CreateProject } from "./createproject";
import { UpdateProject } from "./Updateproject";
import { DeleteProject } from "./Deleteproject";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<TProject | null>(null);

  const { data: projectsData, isLoading, error } = projectsAPI.useGetProjectsQuery();

  // Status → Colour Map (text is always black)
  const getStatusColor = (status?: string) => {
    switch ((status || "").toLowerCase()) {
      case "critical":
        return "bg-red-700 text-black";
      case "high":
        return "bg-red-500 text-black";
      case "medium":
        return "bg-yellow-400 text-black";
      case "low":
        return "bg-green-500 text-black";
      case "completed":
        return "bg-[#148C0F] text-black";
      case "active":
        return "bg-blue-600 text-black";
      case "pending":
        return "bg-orange-500 text-black";
      default:
        return "bg-gray-500 text-black";
    }
  };

  return (
    <div className="p-4">
      {/* Create Project Button */}
      <div className="flex justify-center mb-4">
        <button
          className="btn bg-green-600 text-black hover:bg-green-700 border border-green-400 rounded-lg px-4 py-2 text-lg"
          onClick={() =>
            (document.getElementById("create-project") as HTMLDialogElement)?.showModal()
          }
        >
          Create Project
        </button>
      </div>

      {/* Modals */}
      <CreateProject />
      <UpdateProject project={selectedProject} />
      {projectToDelete && (
        <DeleteProject projectId={projectToDelete.projectid} />
      )}

      {/* Loading / Errors */}
      {isLoading && <p className="text-center text-black">Loading projects…</p>}
      {error && <p className="text-center text-black">Error loading projects.</p>}

      {/* Projects Table */}
      {projectsData && projectsData.length > 0 ? (
        <div className="md:overflow-x-auto">
          <table className="table w-full bg-white border border-green-300 rounded-md shadow-md">
            <thead>
              <tr className="bg-green-700 text-black text-md lg:text-lg">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created By</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {projectsData.map((project: TProject) => (
                <tr
                  key={project.projectid}
                  className="hover:bg-green-100 border-b border-green-300"
                >
                  <td className="px-4 py-3 border-r border-green-300 lg:text-base text-black">
                    {project.title}
                  </td>

                  <td className="px-4 py-3 border-r border-green-300 lg:text-base text-black">
                    {project.description}
                  </td>

                  <td className="px-4 py-3 border-r border-green-300 lg:text-base">
                    <span
                      className={`badge px-3 py-2 rounded-md text-sm font-medium ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 border-r border-green-300 lg:text-base text-black">
                    {project.created_by}
                  </td>

                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="btn btn-sm bg-green-500 hover:bg-green-600 text-black rounded-md"
                      onClick={() => {
                        setSelectedProject(project);
                        (
                          document.getElementById(
                            "update-project-modal"
                          ) as HTMLDialogElement
                        )?.showModal();
                      }}
                    >
                      Update
                    </button>

                    <button
                      className="btn btn-sm bg-red-600 hover:bg-red-700 text-black rounded-md"
                      onClick={() => {
                        setProjectToDelete(project);
                        (
                          document.getElementById(
                            "delete-project-modal"
                          ) as HTMLDialogElement
                        )?.showModal();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-6 text-black">No projects found.</p>
      )}
    </div>
  );
}

