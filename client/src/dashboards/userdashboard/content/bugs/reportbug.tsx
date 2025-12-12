import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bugsAPI, type CreateBugDTO } from "../../../../features/bugs/bugsAPI";
import { toast } from "sonner";

const schema = yup.object({
  projectid: yup.number().positive().integer().required("Project ID is required"),
  title: yup.string().max(150, "Max 150 characters").required("Title is required"),
  description: yup.string().max(500, "Max 500 characters").required("Description is required"),
  severity: yup
    .string()
    .oneOf(["low", "medium", "high", "critical"])
    .required("Severity is required"),
  status: yup
    .string()
    .oneOf(["open", "in_progress", "resolved", "closed"])
    .required("Status is required"),
  reported_by: yup.number().positive().integer().required("Reporter ID is required"),
  assigned_to: yup.number().positive().integer().nullable(),
});

export const CreateBugModal = () => {
  const [createBug, { isLoading }] = bugsAPI.useCreateBugMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBugDTO>({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "", // ensures description is always a string for TypeScript
      assigned_to: undefined,
    },
  });

  const onSubmit: SubmitHandler<CreateBugDTO> = async (data) => {
    try {
      await createBug(data).unwrap();
      toast.success("Bug reported successfully!");
      reset();
      (document.getElementById("create-bug-modal") as HTMLDialogElement)?.close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to report bug. Please try again.");
    }
  };

  return (
    <dialog id="create-bug-modal" className="modal sm:modal-middle">
      <div className="modal-box bg-green-100 text-black w-full max-w-md mx-auto rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="number"
            {...register("projectid")}
            placeholder="Project ID"
            className="input input-bordered w-full bg-white text-black"
          />
          {errors.projectid && <span className="text-red-700 text-sm">{errors.projectid.message}</span>}

          <input
            type="text"
            {...register("title")}
            placeholder="Bug Title"
            className="input input-bordered w-full bg-white text-black"
          />
          {errors.title && <span className="text-red-700 text-sm">{errors.title.message}</span>}

          <textarea
            {...register("description")}
            placeholder="Bug Description"
            className="textarea textarea-bordered w-full bg-white text-black"
          />
          {errors.description && <span className="text-red-700 text-sm">{errors.description.message}</span>}

          <select {...register("severity")} className="select select-bordered w-full bg-white text-black">
            <option value="">Select Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          {errors.severity && <span className="text-red-700 text-sm">{errors.severity.message}</span>}

          <select {...register("status")} className="select select-bordered w-full bg-white text-black">
            <option value="">Select Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          {errors.status && <span className="text-red-700 text-sm">{errors.status.message}</span>}

          <input
            type="number"
            {...register("reported_by")}
            placeholder="Reported By (User ID)"
            className="input input-bordered w-full bg-white text-black"
          />
          {errors.reported_by && <span className="text-red-700 text-sm">{errors.reported_by.message}</span>}

          <input
            type="number"
            {...register("assigned_to")}
            placeholder="Assigned To (Optional User ID)"
            className="input input-bordered w-full bg-white text-black"
          />
          {errors.assigned_to && <span className="text-red-700 text-sm">{errors.assigned_to.message}</span>}

          <div className="modal-action flex justify-between">
            <button
              type="submit"
              className="btn bg-green-600 hover:bg-green-700 text-black"
              disabled={isLoading}
            >
              {isLoading ? "Reporting..." : "Report Bug"}
            </button>
            <button
              type="button"
              className="btn bg-gray-300 hover:bg-gray-400 text-black"
              onClick={() =>
                (document.getElementById("create-bug-modal") as HTMLDialogElement)?.close()
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
