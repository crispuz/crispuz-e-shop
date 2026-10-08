import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./Button";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed left-0 top-0 right-0 z-50 bg-transparent">
      <div
        className={`container mx-auto px-6 flex items-center justify-between py-3 border border-border/20  rounded-full ${isScrolled ? "glass-strong " : ""}`}
      >
        {/* logo */}
        <motion.div
          className="text-lg"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          <Link to="/">
            <span className="-rotate-10 text-primary">e</span>
            <span className="font-serif font-bold text-purple-700">-Shop.</span>
          </Link>
        </motion.div>

        {/* Links */}
        <div className="flex gap-2 border border-border/20 text-muted-foreground rounded-full">
          <Link
            to="/"
            className="px-2 border border-border/40 rounded-full hover:bg-primary/50 hover:border-primary transition-all duration-300 active:border-primary outline-none"
          >
            Home
          </Link>
          <Link
            to="/checkout"
            className="px-2 border border-border/40 rounded-full hover:bg-primary/50 hover:border-primary transition-all duration-300"
          >
            Checkout
          </Link>
          <Link
            to="/cart"
            className="px-2 border border-border/40 rounded-full hover:bg-primary/50 hover:border-primary transition-all duration-300"
          >
            Cart
          </Link>
        </div>

        {/* Auth */}
        <div className="text-sm text-muted-foreground">
          <Link to="/auth" className="px-2">
            <Button size="sm">Login</Button>
          </Link>
          {/* <Link to="/auth">
            <Button size="sm">
              SignUp
            </Button>
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
