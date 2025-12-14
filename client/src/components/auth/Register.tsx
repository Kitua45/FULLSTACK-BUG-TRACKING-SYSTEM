import React from "react"
import Navbar from "../Nav/navbar"
import { useForm, type SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { usersAPI } from "../../features/auth/userAPIs"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

type RegisterInputs = {
  first_name: string
  last_name: string
  email: string
  password_hash: string
  confirmPassword: string
}

const schema = yup.object({
  first_name: yup.string().max(50, "Max 50 characters").required("First name is required"),
  last_name: yup.string().max(50, "Max 50 characters").required("Last name is required"),
  email: yup.string().email("Invalid email").max(100, "Max 100 characters").required("Email is required"),
  password_hash: yup.string().min(6, "Min 6 characters").max(255, "Max 255 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password_hash")], "Password must match")
    .required("Confirm password is required"),
})

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const [createUser, { isLoading }] = usersAPI.useCreateUsersMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const response = await createUser(data).unwrap()
      toast.success(response.message)

      setTimeout(() => {
        navigate("/verify", { state: { email: data.email } })
      }, 2000)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("An unexpected error occurred")
      }
    }
  }

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-[#F0F9F0] relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#2ABF24] rounded-full opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#148C0F] rounded-full opacity-10"></div>

        <div className="relative w-full max-w-lg p-8 rounded-xl shadow-2xl bg-white/90 backdrop-blur-sm">
          <h1
            className="text-3xl font-bold mb-6 text-center text-[#054003]"
            data-test="register-heading"
          >
            Account Registration
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              {...register("first_name")}
              placeholder="First Name"
              data-test="register-first-name"
              className="w-full p-2 rounded border border-[#148C0F] text-lg text-black placeholder:text-black"
            />
            {errors.first_name && (
              <span data-test="error-first-name" className="text-red-700 text-sm">
                {errors.first_name.message}
              </span>
            )}

            <input
              type="text"
              {...register("last_name")}
              placeholder="Last Name"
              data-test="register-last-name"
              className="w-full p-2 rounded border border-[#148C0F] text-lg text-black placeholder:text-black"
            />
            {errors.last_name && (
              <span data-test="error-last-name" className="text-red-700 text-sm">
                {errors.last_name.message}
              </span>
            )}

            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              data-test="register-email"
              className="w-full p-2 rounded border border-[#148C0F] text-lg text-black placeholder:text-black"
            />
            {errors.email && (
              <span data-test="error-email" className="text-red-700 text-sm">
                {errors.email.message}
              </span>
            )}

            <input
              type="password"
              {...register("password_hash")}
              placeholder="Password"
              data-test="register-password"
              className="w-full p-2 rounded border border-[#148C0F] text-lg text-black placeholder:text-black"
            />
            {errors.password_hash && (
              <span data-test="error-password" className="text-red-700 text-sm">
                {errors.password_hash.message}
              </span>
            )}

            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              data-test="register-confirm-password"
              className="w-full p-2 rounded border border-[#148C0F] text-lg text-black placeholder:text-black"
            />
            {errors.confirmPassword && (
              <span data-test="error-confirm-password" className="text-red-700 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}

            <button
              type="submit"
              data-test="register-submit"
              disabled={isLoading}
              className="w-full py-2 mt-4 rounded bg-[#148C0F] text-white hover:bg-[#2ABF24] disabled:opacity-70 flex justify-center items-center"
            >
              {isLoading ? "Please Wait..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
