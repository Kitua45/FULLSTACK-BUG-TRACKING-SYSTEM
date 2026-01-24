import { useEffect, useState } from "react";
import { projectsAPI } from "../../../../features/projects/projectAPI";
import { toast } from "sonner";

type DeleteProjectProps = {
  projectId: number | null;
  onDeleted?: () => void;
};

export function DeleteProject({ projectId, onDeleted }: DeleteProjectProps) {
  const [deleteProject, { isLoading }] = projectsAPI.useDeleteProjectMutation();
  const [open, setOpen] = useState(false);

  // Open modal whenever projectId changes, without triggering ESLint warning
  useEffect(() => {
    if (projectId) {
      // Schedule the state update after the current render
      const timer = setTimeout(() => setOpen(true), 0);
      return () => clearTimeout(timer);
    }
  }, [projectId]);

  const handleDelete = async () => {
    if (!projectId) return;

    try {
      const response = await deleteProject(projectId).unwrap();
      toast.success(response.message);

      setOpen(false); // close modal

      if (onDeleted) onDeleted(); // notify parent to refresh list
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project.");
    }
  };

  if (!open) return null;

  return (
    <div className="modal" data-test="delete-project-modal">
      <div className="modal-box bg-gray-600 text-white rounded-lg">
        <h3 className="text-lg font-bold" data-test="delete-project-title">
          Confirm Delete
        </h3>
        <p data-test="delete-project-message">
          Are you sure you want to delete this project?
        </p>
        <div className="modal-action">
          <button
            className="btn btn-error"
            onClick={handleDelete}
            disabled={isLoading}
            data-test="delete-project-confirm-button"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            className="btn"
            onClick={() => setOpen(false)}
            data-test="delete-project-cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}


