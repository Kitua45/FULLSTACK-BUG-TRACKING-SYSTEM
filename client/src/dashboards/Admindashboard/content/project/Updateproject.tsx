import { useEffect, useState } from "react";
import { projectsAPI, type TProject } from "../../../../features/projects/projectAPI";
import { toast } from "sonner";

interface Props {
  project: TProject | null;
}

export function UpdateProject({ project }: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "active", // default status
  });

  const [updateProject, { isLoading }] = projectsAPI.useUpdateProjectMutation();

  // Fill form when project changes
  useEffect(() => {
    if (!project) return;

    setForm({
      title: project.title || "",
      description: project.description || "",
      status: project.status === "inactive" ? "inactive" : "active", // only active/inactive
    });
  }, [project]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!project) return;

    const payload = {
      id: project.projectid, // backend expects 'id'
      title: form.title,
      description: form.description,
      status: form.status === "inactive" ? "inactive" : "active",
    };

    try {
      await updateProject(payload).unwrap();
      toast.success("Project updated successfully!");
      (document.getElementById("update-project-modal") as HTMLDialogElement)?.close();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update project.");
    }
  };

  return (
    <dialog id="update-project-modal" className="modal" key={project?.projectid}>
      <div className="modal-box border border-green-400 shadow-lg">
        <h3 className="font-bold text-xl text-green-700 mb-3">Update Project</h3>

        {/* Title */}
        <label className="label">
          <span className="label-text font-semibold">Project Title</span>
        </label>
        <input
          type="text"
          name="title"
          className="input input-bordered w-full border-green-400"
          value={form.title}
          onChange={handleChange}
        />

        {/* Description */}
        <label className="label mt-3">
          <span className="label-text font-semibold">Description</span>
        </label>
        <textarea
          name="description"
          className="textarea textarea-bordered w-full border-green-400"
          value={form.description}
          onChange={handleChange}
        />

        {/* Status */}
        <label className="label mt-3">
          <span className="label-text font-semibold">Status</span>
        </label>
        <select
          name="status"
          className="select select-bordered w-full border-green-400"
          value={form.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Buttons */}
        <div className="modal-action flex justify-between mt-4">
          <button
            className="btn bg-green-600 text-white hover:bg-green-700 border border-green-500"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>

          <button
            className="btn bg-red-600 text-white hover:bg-red-700"
            onClick={() =>
              (document.getElementById("update-project-modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}
