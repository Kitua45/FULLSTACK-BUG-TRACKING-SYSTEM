import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usersAPI } from "../../features/auth/userAPIs";
import { useEffect } from "react";
import { toast } from "sonner";

type UpdateProfileInputs = {
    first_name: string;
    last_name: string;
};

const schema = yup.object({
    first_name: yup
        .string()
        .max(50, "Max 50 characters")
        .required("First name is required"),
    last_name: yup
        .string()
        .max(50, "Max 50 characters")
        .required("Last name is required"),
});

interface User {
    userid: number;
    first_name?: string;
    last_name?: string;
}

interface UpdateUserProps {
    user: User;
    refetch?: () => void;
}

export const UpdateUser = ({ user, refetch }: UpdateUserProps) => {
    const [updateUser, { isLoading }] =
        usersAPI.useUpdateUserProfileMutation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<UpdateProfileInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<UpdateProfileInputs> = async (data) => {
        try {
            const res = await updateUser({ id: user.userid, ...data });

            toast.success(res.data?.message);
            refetch?.();

            // Close modal
            (
                document.getElementById(
                    "update_profile_modal"
                ) as HTMLDialogElement
            )?.close();
        } catch (error: unknown) {
            console.error("Update error:", error);

            const apiError =
                typeof error === "object" &&
                error !== null &&
                "data" in error
                    ? (error as { data?: { message?: string } })
                    : null;

            toast.error(
                apiError?.data?.message ||
                    "Failed to update profile. Please try again."
            );
        }
    };

    useEffect(() => {
        if (user) {
            setValue("first_name", user.first_name || "");
            setValue("last_name", user.last_name || "");
        }
    }, [user, setValue]);

    return (
        <dialog
            id="update_profile_modal"
            className="modal sm:modal-middle"
        >
            <div className="modal-box bg-green-900/90 text-white border border-green-700 shadow-lg rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-green-300">
                    Update Profile
                </h3>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    {/* FIRST NAME */}
                    <input
                        type="text"
                        {...register("first_name")}
                        placeholder="First Name"
                        className="input rounded w-full p-2 bg-white text-gray-800 border border-green-600 focus:ring-2 focus:ring-green-400"
                    />
                    {errors.first_name && (
                        <span className="text-sm text-red-400">
                            {errors.first_name.message}
                        </span>
                    )}

                    {/* LAST NAME */}
                    <input
                        type="text"
                        {...register("last_name")}
                        placeholder="Last Name"
                        className="input rounded w-full p-2 bg-white text-gray-800 border border-green-600 focus:ring-2 focus:ring-green-400"
                    />
                    {errors.last_name && (
                        <span className="text-sm text-red-400">
                            {errors.last_name.message}
                        </span>
                    )}

                    <div className="modal-action flex flex-col sm:flex-row gap-2">
                        <button
                            type="submit"
                            className="btn bg-green-700 hover:bg-green-800 text-white w-full sm:w-auto"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner" />
                                    Updating...
                                </>
                            ) : (
                                "Update"
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                (
                                    document.getElementById(
                                        "update_profile_modal"
                                    ) as HTMLDialogElement
                                )?.close();
                                reset();
                            }}
                            disabled={isLoading}
                            className="btn bg-gray-500 hover:bg-gray-600 text-white w-full sm:w-auto"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};
