import { useContext } from "react";
import { AuthContext } from "./AuthContextBase";

/** Returns the authentication context; throws when called outside AuthProvider. */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
