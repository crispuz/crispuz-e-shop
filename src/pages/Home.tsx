import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Button from "../components/Button";
import showcase from "../assets/showcase.png";
import { container, fadeInUp } from "../components/Animations";

export default function Home() {
  return (
    <motion.section
      variants={container}
      initial={"hidden"}
      animate={"visible"}
      id="home"
      className="bg-[url('./assets/showcase.png')] bg-cover bg-no-repeate"
    >
      <div className="relative min-h-screen overflow-hidden py-32 px-4 bg-background/80 backdrop-blur-xs">
        <div className="container mx-auto grid items-center inset-0 gap-12 px-4 lg:grid-cols-2">
          {/* Left Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Welcome Badge */}
            <motion.div
              variants={fadeInUp}
              className="mb-8 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm text-secondary-foreground"
            >
              <Sparkles className="h-4 w-4 text-primary" />

              <h2>
                Welcome to <span className="font-semibold text-primary">e</span>
                <span className="text-purple-700">-shop.</span>
              </h2>
            </motion.div>

            {/* Heading */}
            <motion.div className="flex flex-col text-5xl font-bold leading-tight tracking-sm sm:text-6xl lg:text-7xl">
              <motion.h2 variants={fadeInUp} className="text-foreground">
                Fast Ordering.
              </motion.h2>

              <motion.h2 variants={fadeInUp} className="text-primary glow-text">
                Reliable.
              </motion.h2>

              <motion.h2 variants={fadeInUp} className="text-foreground">
                Affordable Price.
              </motion.h2>
            </motion.div>

            {/* Description */}
            <motion.div variants={fadeInUp} className="mt-8 max-w-xl">
              <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                We bring amazing products right to your fingertips.
                <span className="ml-1 font-medium italic text-primary">
                  Just click and we deliver to your doorstep.
                </span>
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="mt-10">
              <Button size="md" variant="primary">
                Discover Now <ArrowUpRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="relative flex min-h-125 items-center justify-center lg:min-h-162.5">
            {/* Crimson ambient glow */}
            <div className="absolute h-105 w-105 rounded-full bg-primary/20 blur-[140px]" />

            {/* Image */}
            <motion.div className="relative z-10 w-full max-w-162.5 rounded-2xl">
              <motion.img
                variants={fadeInUp}
                src={showcase}
                alt="E-shop online shopping and delivery"
                className="h-auto rounded-3xl w-full object-contain drop-shadow-[0_30px_80px_rgba(220,20,60,0.25)] border glow-border border-primary/20"
              />
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 100 * 0.1 }}
                className="relative glass border border-border/20 glow-border rounded-3xl my-4 p-6"
              >
                <div className="absolute left-2 top-7.5 z-10 h-3 w-3 bg-primary rounded-full animate-pulse" />
                <p className="text-lg mb-3 text-muted-foreground">
                  Available now, purchase with us now and we deliver at
                  affodable price.
                </p>
                <span className="leading-relaxed tracking-wider flex justify-between mx-8 text-primary items-center">
                  Anywhere <span>.</span> Anytime <span>.</span> Anydevice
                </span>
              </motion.div>
            </motion.div>

            {/* Decorative glow */}
            <div className="absolute -right-20 top-10 h-40 w-40 rounded-full bg-primary/10 blur-[100px]" />
            <div className="absolute -bottom-10 left-10 h-32 w-32 rounded-full bg-primary/10 blur-[90px]" />
          </div>
        </div>
        <div className="flex justify-center items-center border border-border/5 rounded-3xl">
          <p className="text-muted m-4 ">
            All terms & conditions applied . Thanks for choosing us!.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
