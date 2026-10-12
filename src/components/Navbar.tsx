import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { ChevronDown, ClipboardList, LogOut, UserRound } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/checkout", label: "Products" },
  { to: "/cart", label: "Cart" },
];

/** Renders navigation links and login or logout controls for the current session. */
export default function Navbar() {
  const { user, warning, logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
            <div className="relative">
              <button
                type="button"
                aria-expanded={isProfileOpen}
                aria-controls="profile-menu"
                aria-label={`Profile menu for ${user.username}`}
                onClick={() => setIsProfileOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-border/30 bg-card/80 py-1.5 pl-1.5 pr-3 text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <UserRound size={17} aria-hidden="true" />
                </span>
                <span className="max-w-24 truncate text-sm font-medium sm:max-w-36">
                  {user.username}
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isProfileOpen && (
                <div
                  id="profile-menu"
                  className="absolute right-0 top-full z-50 mt-2 w-64 glass overflow-hidden rounded-2xl border border-border/40 hover:border-primary shadow-xl"
                >
                  <div className="border-b border-border/30 px-4 py-3">
                    <p className="truncate font-semibold text-foreground">
                      {user.fullname}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to="/orders"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:bg-primary/10"
                  >
                    <ClipboardList size={16} aria-hidden="true" />
                    My Orders
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      logOut();
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10 focus-visible:outline-none focus-visible:bg-red-500/10"
                  >
                    <LogOut size={16} aria-hidden="true" />
                    Logout
                  </button>
                </div>
              )}
            </div>
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
        {warning && (
          <p
            role="status"
            className="absolute right-4 top-full mt-2 max-w-xs rounded-xl border border-amber-500/30 bg-card p-3 text-xs text-amber-200 shadow-lg"
          >
            {warning}
          </p>
        )}
      </div>
    </nav>
  );
}
