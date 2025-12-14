import { useEffect } from "react";
import { projectsAPI } from "../../../../features/projects/projectAPI";
import { toast } from "sonner";

type DeleteProjectProps = {
  projectId: number;
};

export function DeleteProject({ projectId }: DeleteProjectProps) {
  const [deleteProject, { isLoading }] = projectsAPI.useDeleteProjectMutation();

  // Open modal whenever projectId changes
  useEffect(() => {
    const modal = document.getElementById("delete-project-modal") as HTMLDialogElement;
    if (modal) modal.showModal();
  }, [projectId]);

  const handleDelete = async () => {
    if (!projectId) return;

    try {
      const response = await deleteProject(projectId).unwrap();
      toast.success(response.message);

      // Close modal
      const modal = document.getElementById("delete-project-modal") as HTMLDialogElement;
      modal?.close();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project.");
    }
  };

  return (
    <dialog id="delete-project-modal" className="modal" data-test="delete-project-modal">
      <div className="modal-box bg-gray-600 text-white rounded-lg">
        <h3 className="text-lg font-bold" data-test="delete-project-title">Confirm Delete</h3>
        <p data-test="delete-project-message">Are you sure you want to delete this project?</p>
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
            onClick={() =>
              (document.getElementById("delete-project-modal") as HTMLDialogElement)?.close()
            }
            data-test="delete-project-cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}

