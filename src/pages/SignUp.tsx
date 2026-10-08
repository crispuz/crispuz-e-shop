import Button from "../components/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";

interface SignUpFormData {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password = useWatch({ control, name: "password" });

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    console.log("Sign Up Data:", data);

    alert("Signed Up");
  };

  return (
    <motion.section id="auth" className="overflow-hidden relative py-32">
      <div className="grid items-center justify-center">
        {/* SignUp Form */}
        <div className="container p-4 m-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border glow-border border-primary/10 glass p-6 m-4 md:p-12 space-y-6 rounded-3xl 
            grid items-center"
          >
            <h2 className="mb-4 md:mb-8 text-xl md:text-2xl lg:text-3xl text-primary flex justify-center font-medium">
              Create an Account to continue
            </h2>

            <div className="bg-transparent p-4 border border-border/10 rounded-2xl space-y-4">
              {/* Full Name */}
              <div className="grid">
                <label>Full Name:</label>

                <input
                  className="font-serif italic text-lg md:textxl lg:text-2xl text-muted bg-surface
                  border border-border/50 m-2 rounded-md outline-none
                  hover:border-primary/50 focus:border-primary
                  focus:text-muted-foreground"
                  {...register("fullname", {
                    required: "Full name is required",
                    minLength: {
                      value: 3,
                      message: "Full name must be at least 3 characters",
                    },
                  })}
                  placeholder="Enter Your Full Name.."
                  type="text"
                />

                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    {errors.fullname.message}
                  </span>
                )}
              </div>

              {/* Username */}
              <div className="grid">
                <label>Username:</label>

                <input
                  className="font-serif italic text-lg md:textxl lg:text-2xl text-muted bg-surface
                  border border-border/50 m-2 rounded-md outline-none
                  hover:border-primary/50 focus:border-primary
                  focus:text-muted-foreground"
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

              {/* Email */}
              <div className="grid">
                <label>Email:</label>

                <input
                  className="font-serif italic text-lg md:textxl lg:text-2xl text-muted bg-surface
                  border border-border/50 m-2 rounded-md outline-none
                  hover:border-primary/50 focus:border-primary
                  focus:text-muted-foreground"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  placeholder="Enter Your Email.."
                  type="email"
                />

                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="grid">
                <label>Password:</label>

                <input
                  className="font-serif italic text-lg md:textxl lg:text-2xl text-muted bg-surface
                  border border-border/50 m-2 rounded-md outline-none
                  hover:border-primary/50 focus:border-primary
                  focus:text-muted-foreground"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 16,
                      message: "Password must be less than 16 characters",
                    },
                  })}
                  placeholder="Enter Your Password.."
                  type="password"
                />

                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="grid">
                <label>Confirm Password:</label>

                <input
                  className="font-serif italic text-lg md:textxl lg:text-2xl text-muted bg-surface
                  border border-border/50 m-2 rounded-md outline-none
                  hover:border-primary/50 focus:border-primary
                  focus:text-muted-foreground"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Confirm Your Password.."
                  type="password"
                />

                {errors.confirmPassword && (
                  <span className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>

            <p className="text-muted-foreground font-serif">
              Already have an account.
              <Link
                to="/login"
                className="text-primary italic font-bold hover:glow-text px-2"
              >
                LogIn
              </Link>
            </p>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
