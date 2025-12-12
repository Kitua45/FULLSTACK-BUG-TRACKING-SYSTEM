import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { projectsAPI } from "../../../../features/projects/projectAPI";
import { toast } from "sonner";

export type CreateProject = {
  title: string;
  description: string;
  status: "active" | "inactive";   
  created_by: number;
};

const schema = yup.object({
  title: yup
    .string()
    .max(100, "Max 100 characters")
    .required("Project title is required"),
  description: yup
    .string()
    .max(500, "Max 500 characters")
    .required("Description is required"),
  status: yup
    .string()
    .oneOf(["active", "inactive"], "Invalid status value")
    .required("Status is required"),
  created_by: yup
    .number()
    .positive("User ID must be positive")
    .integer("User ID must be an integer")
    .required("Created By is required"),
});

export const CreateProject = () => {
  const [createProject, { isLoading }] = projectsAPI.useCreateProjectMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProject>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateProject> = async (data) => {
    try {
      const response = await createProject(data).unwrap();
      toast.success(response.message);
      (document.getElementById("create-project") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    }
  };

  return (
    <dialog id="create-project" className="modal sm:modal-middle">
      <div className="modal-box bg-green-600 text-black w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            {...register("title")}
            placeholder="Project Title"
            className="input rounded w-full p-2 text-lg bg-green-100 text-black"
          />
          {errors.title && (
            <span className="text-sm text-red-700">{errors.title.message}</span>
          )}

          <textarea
            {...register("description")}
            placeholder="Project Description"
            className="textarea rounded w-full p-2 text-lg bg-green-100 text-black"
          />
          {errors.description && (
            <span className="text-sm text-red-700">{errors.description.message}</span>
          )}

          <select
            {...register("status")}
            className="select rounded w-full p-2 text-lg bg-green-100 text-black"
            onChange={(e) => e.target.value as "active" | "inactive"}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <span className="text-sm text-red-700">{errors.status.message}</span>
          )}

          <input
            type="number"
            {...register("created_by")}
            placeholder="Created By (User ID)"
            className="input rounded w-full p-2 text-lg bg-green-100 text-black"
          />
          {errors.created_by && (
            <span className="text-sm text-red-700">{errors.created_by.message}</span>
          )}

          <div className="modal-action flex justify-between">
            <button
              type="submit"
              className="btn bg-green-700 hover:bg-green-800 text-black"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-black" /> Creating...
                </>
              ) : (
                "Create"
              )}
            </button>

            <button
              className="btn bg-green-300 hover:bg-green-400 text-black"
              type="button"
              onClick={() =>
                (document.getElementById("create-project") as HTMLDialogElement)?.close()
              }
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
