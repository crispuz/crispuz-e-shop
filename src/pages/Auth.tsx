import type { FormEvent } from "react";
import Button from "../components/Button";
import { motion } from "framer-motion";

export default function Auth() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("submitted ");
  }

  return (
    <section id="auth" className="overflow-hidden relative py-32">
      <div className="grid items-center justify-center">
        {/* Login Form */}
        <div className="container p-4 m-4">
          <form
            onSubmit={handleSubmit}
            className="border border-primary/10 glass p-6 m-4 md:p-12 space-y-6 rounded-3xl 
            grid items-center glow-border "
          >
            <h2 className="mb-4 md:mb-8 text-xl md:text-2xl lg:text-3xl text-primary flex justify-center font-medium">
              Welcome back.
            </h2>
            <div className=" bg-transparent p-4 border border-border/10 rounded-2xl space-y-4">
              <div className="grid ">
                <label className="">Username:</label>
                <input
                  className=" font-serif italic text-lg md:textxl lg:text-2xl text-muted bg-surface
                border border-border/50 m-2 rounded-md outline-none
                hover:border-primary/50 focus:border-primary 
                focus:text-muted-foreground
                "
                  placeholder="Enter Your Username.."
                  required
                  type="username"
                />
              </div>

              <div className="grid ">
                <label className="">Password:</label>
                <input
                  className=" font-serif italic text-lg md:text-xl lg:text-2xl text-muted bg-surface
                border border-border/50 m-2 rounded-md outline-none
                hover:border-primary/50 focus:border-primary
                "
                  placeholder="Enter your password..."
                  required
                  type="password"
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

              <div className="flex items-baseline justify-center gap-2 it">
                <p className=" md:text-lg leading-tight font-serif flex justify-center">
                  Don't have an account yet.{" "}
                </p>
                <motion.button
                  className="border border-border/20 rounded-2xl px-2 hover:bg-purple-700/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <span className="text-primary italic font-bold ">SignUp</span>
                </motion.button>
              </div>
            </div>
          </form>
        </div>

        {/* SignUp Form */}
        <div className="container p-4 m-4">
          <form
            className="border glow-border border-primary/10 glass p-6 m-4 md:p-12 space-y-6 rounded-3xl 
            grid items-center "
          >
            <h2 className="mb-4 md:mb-8 text-xl md:text-2xl lg:text-3xl text-primary flex justify-center font-medium">
              Create an Account to continue
            </h2>
            <div className=" bg-transparent p-4 border border-border/10 rounded-2xl space-y-4">
              <div className="grid">
                <label>Full Name:</label>
                <input
                  className=" font-serif italic text-lg md:textxl lg:text-2xl text-muted bg-surface
                border border-border/50 m-2 rounded-md outline-none
                hover:border-primary/50 focus:border-primary 
                focus:text-muted-foreground
                "
                  placeholder="Enter Your Full Name.."
                  required
                  type="fullname"
                />
              </div>
              <div className="grid">
                <label>Username:</label>
                <input
                  className=" font-serif italic text-lg md:textxl lg:text-2xl text-muted bg-surface
                border border-border/50 m-2 rounded-md outline-none
                hover:border-primary/50 focus:border-primary 
                focus:text-muted-foreground
                "
                  placeholder="Enter Your Username.."
                  required
                  type="username"
                />
              </div>
              <div className="grid">
                <label>Email:</label>
                <input
                  className=" font-serif italic text-lg md:textxl lg:text-2xl text-muted bg-surface
                border border-border/50 m-2 rounded-md outline-none
                hover:border-primary/50 focus:border-primary 
                focus:text-muted-foreground
                "
                  placeholder="Enter Your Email.."
                  required
                  type="email"
                />
              </div>
              <div className="grid">
                <label>Password</label>
                <input
                  className=" font-serif italic text-lg md:textxl lg:text-2xl text-muted bg-surface
                border border-border/50 m-2 rounded-md outline-none
                hover:border-primary/50 focus:border-primary 
                focus:text-muted-foreground
                "
                  placeholder="Enter Your Password.."
                  required
                  type="password"
                />
              </div>
              <div className="grid">
                <label>confirm password</label>
                <input
                  className=" font-serif italic text-lg md:textxl lg:text-2xl text-muted bg-surface
                border border-border/50 m-2 rounded-md outline-none
                hover:border-primary/50 focus:border-primary 
                focus:text-muted-foreground
                "
                  placeholder="Enter Your Username.."
                  required
                  type="username"
                />
              </div>
              <Button className="w-full">Create account</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
