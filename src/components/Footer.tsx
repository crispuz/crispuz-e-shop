import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSocialLinks } from "../hooks/SocialLinks";

export default function Footer() {
  const links = useSocialLinks();

  return (
    <footer className="left-0 bottom-0 right-0 border border-border/30 p-6 md:p-8 space-x-6 rounded-xl">
      <div className="flex justify-center">
        <motion.div
          className="text-2xl"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          <Link to="/">
            <span className="-rotate-10 text-primary">e</span>
            <span className="font-serif font-bold text-purple-700">-Shop.</span>
          </Link>
        </motion.div>

        {/* Social Links */}
        <div>
          {/* social links here */}
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.id}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                <div>{link.label}</div>
                <div>
                  <Icon />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
