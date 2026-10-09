import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

const links = [
  { to: "/", label: "Home" },
  { to: "/checkout", label: "Products" },
  { to: "/cart", label: "Cart" },
];

export default function Navbar() {
  const { user, logOut } = useAuth();
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
          {/* <Link
            to="/"
            className=" relative group px-2 border border-border/20 rounded-2xl  transition-all duration-300 active:border-primary outline-none"
          >
            Home
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link
            to="/checkout"
            className="relative group px-2 border border-border/40 rounded-2xl transition-all duration-300"
          >
            Checkout
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link
            to="/cart"
            className="relative group px-2 border border-border/40 rounded-2xl transition-all duration-300"
          >
            Cart
            <span className="absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
          </Link> */}
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              end={link.to === "/"}
              className="relative group px-2 border border-border/20 rounded-2xl  transition-all duration-300 active:border-primary outline-none"
            >
              {({ isActive }) => (
                <>
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 w-full origin-center transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100  bg-primary"
                        : "scale-x-0 group-hover:scale-x-100 bg-primary/50"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Auth */}
        <div className="text-sm text-muted-foreground">
          {user ? (
            <Button size="sm" onClick={logOut}>
              Logout
            </Button>
          ) : (
            <Link to="/login" className="px-2">
              <Button size="sm">Login</Button>
            </Link>
          )}
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
