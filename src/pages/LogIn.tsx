import Button from "../components/Button";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LogIn() {
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const returnTo = (
    location.state as { returnTo?: unknown } | null
  )?.returnTo;
  const destination =
    typeof returnTo === "string" &&
    returnTo.startsWith("/") &&
    !returnTo.startsWith("//")
      ? returnTo
      : "/";

  const onSubmit: SubmitHandler<LoginFormData> = async (credentials) => {
    setAuthError(null);
    try {
      await logIn(credentials);
      navigate(destination);
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Unable to sign in.",
      );
    }
  };

  return (
    <motion.section id="auth" className="overflow-hidden relative py-32">
      <div className="grid items-center justify-center">
        {/* Login Form */}
        <div className="container p-4 m-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-primary/10 glass p-6 m-4 md:p-12 space-y-6 rounded-3xl 
            grid items-center glow-border"
          >
            <h2 className="mb-4 md:mb-8 text-xl md:text-2xl lg:text-3xl text-primary flex justify-center font-medium">
              Welcome back.
            </h2>

            <div className="bg-transparent p-4 border border-border/10 rounded-2xl space-y-4">
              {authError && (
                <p role="alert" className="text-sm text-red-500">
                  {authError}
                </p>
              )}

              {/* Username */}
              <div className="grid">
                <label htmlFor="username">Username:</label>

                <input
                  className="font-serif italic text-lg md:textxl lg:text-2xl text-muted bg-surface
                  border border-border/50 m-2 rounded-md outline-none
                  hover:border-primary/50 focus:border-primary
                  focus:text-muted-foreground"
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  placeholder="Enter Your Username.."
                  type="text"
                />

                {errors.username && (
                  <span className="text-sm text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="grid">
                <label htmlFor="password">Password:</label>

                <input
                  className="font-serif italic text-lg md:text-xl lg:text-2xl text-muted bg-surface
                  border border-border/50 m-2 rounded-md outline-none
                  hover:border-primary/50 focus:border-primary"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="Enter your password..."
                  type="password"
                />

                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full">
                Login
              </Button>

              {/* Signup Link */}
              <div className="flex items-baseline justify-center gap-2">
                <p className="md:text-lg leading-tight text-muted-foreground font-serif flex justify-center">
                  Don't have an account yet.
                </p>

                <Link to="/signup" className="text-primary italic font-bold">
                  SignUp
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
