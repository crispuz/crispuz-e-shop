import { createContext } from "react";

export interface AuthUser {
  fullname: string;
  username: string;
  email: string;
}

export interface SignUpCredentials extends AuthUser {
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface StoredAccount extends AuthUser {
  salt: string;
  passwordHash: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  logIn: (credentials: LoginCredentials) => Promise<void>;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
