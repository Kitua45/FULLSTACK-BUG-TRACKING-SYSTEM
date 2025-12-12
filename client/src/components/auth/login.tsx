import React from "react";
import Navbar from "../Nav/navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginAPI } from "../../features/auth/loginAPIs";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/userslice";
import { useNavigate } from "react-router-dom";

type LoginInputs = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Invalid email").max(100, "Max 100 characters").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").max(20, "Max 20 characters").required("Password is required"),
});

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      toast.success(response.message);
      console.log(response);

      dispatch(loginSuccess(response));

      if (response.user.role === "admin") {
        navigate("/admin/dashboard/");
      } else {
        navigate("/user/dashboard/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (typeof error === "object" && error !== null && "data" in error) {
        const e = error as { data?: { error?: string } };
        toast.error(e.data?.error || "An unexpected error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-[#F0F9F0] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#2ABF24] rounded-full opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#148C0F] rounded-full opacity-10"></div>

        {/* Form container */}
        <div className="relative w-full max-w-lg p-8 rounded-xl shadow-2xl bg-white/90 backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#054003]">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full p-3 rounded border border-[#148C0F] text-lg focus:outline-none focus:ring-2 focus:ring-[#2ABF24] transition-all text-black placeholder:text-black"
            />
            {errors.email && <span className="text-red-700 text-sm">{errors.email.message}</span>}

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full p-3 rounded border border-[#148C0F] text-lg focus:outline-none focus:ring-2 focus:ring-[#2ABF24] transition-all text-black placeholder:text-black"
            />
            {errors.password && <span className="text-red-700 text-sm">{errors.password.message}</span>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-4 rounded bg-[#148C0F] text-white hover:bg-[#2ABF24] disabled:opacity-70 flex justify-center items-center font-semibold transition-colors"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner mr-2" /> please wait ...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
