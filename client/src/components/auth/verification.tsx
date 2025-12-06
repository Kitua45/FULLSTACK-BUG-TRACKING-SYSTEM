import React from "react";
import Navbar from "../Nav/navbar";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usersAPI } from "../../features/auth/userAPIs";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

type VerifyInputs = {
  email: string;
  code: string;
};

const schema = yup.object({
  email: yup.string().email("Invalid email").max(100, "Max 100 characters").required("Email is required"),
  code: yup.string().min(6, "Max 6 characters").required("Code is required"),
});

export const Verification: React.FC = () => {
  const navigate = useNavigate();
  const [verifyUser, { isLoading }] = usersAPI.useVerifyUserMutation();
  const location = useLocation();
  const emailState = location.state?.email || "";

  const { register, handleSubmit, formState: { errors } } = useForm<VerifyInputs>({
    resolver: yupResolver(schema),
    defaultValues: { email: emailState },
  });

  const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {
    try {
      const response = await verifyUser(data).unwrap();
      toast.success(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Fully type-safe handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (typeof error === "object" && error !== null && "data" in error) {
        const e = error as { data?: { message?: string } };
        if (e.data?.message) {
          toast.error(e.data.message);
        } else {
          toast.error("An unexpected error occurred");
        }
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
          <h1 className="text-3xl font-bold mb-6 text-center text-[#054003]">
            Verify your Account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full p-2 rounded border border-[#148C0F] text-lg focus:outline-none focus:ring-2 focus:ring-[#2ABF24]"
            />
            {errors.email && (
              <span className="text-red-700 text-sm">{errors.email.message}</span>
            )}

            <input
              type="number"
              {...register("code")}
              placeholder="Code"
              className="w-full p-2 rounded border border-[#148C0F] text-lg focus:outline-none focus:ring-2 focus:ring-[#2ABF24]"
            />
            {errors.code && (
              <span className="text-red-700 text-sm">{errors.code.message}</span>
            )}

            <button
              type="submit"
              className="w-full py-2 mt-4 rounded bg-[#148C0F] text-white hover:bg-[#2ABF24] disabled:opacity-70 flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner mr-2" /> Verifying...
                </>
              ) : (
                "Verify your Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
