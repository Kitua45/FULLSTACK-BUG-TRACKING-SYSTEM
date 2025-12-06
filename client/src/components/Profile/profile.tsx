import { usersAPI } from "../../features/auth/userAPIs";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { logOut } from "../../features/auth/userslice";
import { useNavigate } from "react-router-dom";
import { UpdateUser } from "./UpdateUser";

export const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user_id = useSelector((state: RootState) => state.user.user?.userid);

    const { data, isLoading, error, refetch } = usersAPI.useGetUserByIdQuery(
        user_id ?? 0,
        { skip: !user_id }
    );

    return (
        <div className="min-h-screen bg-[#F5F5F5] p-6">
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading profile</p>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#148C0F]">
                    <h2 className="text-xl font-semibold mb-4 text-[#054003]">
                        User Information
                    </h2>

                    <div className="flex flex-col items-center mb-4 gap-4 border border-[#148C0F] p-4 rounded-lg shadow-sm bg-[#F5FFF5]">
                        <img
                            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                            alt="user avatar"
                            className="w-40 h-40 object-cover rounded-full border-4 border-[#2ABF24]"
                        />

                        <div className="text-center">
                            <h3 className="text-lg font-bold text-[#054003]">
                                {data?.first_name} {data?.last_name}
                            </h3>
                            <p className="text-gray-700">User ID: {data?.userid}</p>
                            <p className="text-gray-700">Email: {data?.email}</p>
                            <p className="text-gray-700">Role: {data?.role}</p>
                            <p className="text-gray-700">
                                Verified:{" "}
                                <span className="font-semibold text-[#148C0F]">
                                    {data?.isVerified ? "Yes" : "No"}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                        <button
                            className="px-6 py-2 rounded bg-[#148C0F] text-white font-semibold shadow hover:bg-[#0e6c0b]"
                            onClick={() =>
                                (document.getElementById(
                                    "update_profile_modal"
                                ) as HTMLDialogElement)?.showModal()
                            }
                        >
                            Update Profile
                        </button>

                        <button
                            className="px-6 py-2 rounded bg-[#BF0F1E] text-white font-semibold shadow hover:bg-[#980b17]"
                            onClick={() => {
                                dispatch(logOut());
                                navigate("/login");
                            }}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            )}

            {data && <UpdateUser user={data} refetch={refetch} />}
        </div>
    );
};
