
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateUserMutation } from "../../../../features/auth/creatuserAPI";
import type { NewUser } from "../../../../features/auth/authTypes";
import { toast } from "sonner";

const schema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export function CreateUser() {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewUser>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<NewUser> = async (data) => {
    try {
      const response = await createUser(data).unwrap();
      toast.success(response.message);
      reset();
      (document.getElementById("create-user-modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    }
  };

  return (
    <dialog id="create-user-modal" className="modal sm:modal-middle">
      <div className="modal-box bg-green-600 text-white w-full max-w-xs sm:max-w-md mx-auto rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-white">Create New User</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register("first_name")}
            placeholder="First Name"
            className="input rounded w-full p-2 text-lg bg-white text-green-900"
          />
          {errors.first_name && <span className="text-red-700 text-sm">{errors.first_name.message}</span>}

          <input
            {...register("last_name")}
            placeholder="Last Name"
            className="input rounded w-full p-2 text-lg bg-white text-green-900"
          />
          {errors.last_name && <span className="text-red-700 text-sm">{errors.last_name.message}</span>}

          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="input rounded w-full p-2 text-lg bg-white text-green-900"
          />
          {errors.email && <span className="text-red-700 text-sm">{errors.email.message}</span>}

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="input rounded w-full p-2 text-lg bg-white text-green-900"
          />
          {errors.password && <span className="text-red-700 text-sm">{errors.password.message}</span>}

          <div className="modal-action flex justify-between">
            <button
              type="submit"
              className="btn bg-green-500 hover:bg-green-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              className="btn bg-gray-300 text-green-900"
              onClick={() =>
                (document.getElementById("create-user-modal") as HTMLDialogElement)?.close()
              }
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
