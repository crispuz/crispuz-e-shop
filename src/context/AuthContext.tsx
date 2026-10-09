import {
  useState,
  type ReactNode,
} from "react";
import {
  AuthContext,
  type AuthUser,
  type SignUpCredentials,
  type LoginCredentials,
  type StoredAccount,
} from "./AuthContextBase";

const USERS_STORAGE_KEY = "users";
const SESSION_STORAGE_KEY = "currentUser";
const PASSWORD_HASH_ITERATIONS = 120_000;

/** Checks whether a value is a non-null object before inspecting its properties. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Checks that a value contains string fullname, username, and email fields. */
function isAuthUser(value: unknown): value is AuthUser {
  if (!isRecord(value)) return false;

  const candidate = value;
  return (
    typeof candidate.fullname === "string" &&
    typeof candidate.username === "string" &&
    typeof candidate.email === "string"
  );
}

/** Checks that a user record also contains string salt and password hash fields. */
function isStoredAccount(value: unknown): value is StoredAccount {
  if (!isRecord(value) || !isAuthUser(value)) return false;

  return (
    typeof value.salt === "string" &&
    typeof value.passwordHash === "string"
  );
}

/**
 * Reads accounts from localStorage, returning an empty list if none are saved.
 * Throws when storage is inaccessible or saved data is invalid.
 */
function readAccounts(): StoredAccount[] {
  const storedAccounts = localStorage.getItem(USERS_STORAGE_KEY);
  if (storedAccounts === null) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(storedAccounts);
  } catch {
    throw new Error("Saved account data is invalid. Clear site storage to continue.");
  }

  if (!Array.isArray(parsed) || !parsed.every(isStoredAccount)) {
    throw new Error("Saved account data has an invalid format.");
  }

  return parsed;
}

/**
 * Reads the saved user from localStorage, returning null if no session exists.
 * Throws when storage is inaccessible or saved data is invalid.
 */
function readSession(): AuthUser | null {
  const storedUser = localStorage.getItem(SESSION_STORAGE_KEY);
  if (storedUser === null) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(storedUser);
  } catch {
    throw new Error("Saved sign-in data is invalid. Clear site storage to continue.");
  }

  if (!isAuthUser(parsed)) {
    throw new Error("Saved sign-in data has an invalid format.");
  }

  return parsed;
}

/** Encodes bytes as a Base64 string for storage. */
function encodeBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

/** Decodes a Base64 string into bytes; throws if the encoding is invalid. */
function decodeBase64(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

/**
 * Derives a Base64-encoded 256-bit password hash using PBKDF2 with SHA-256.
 * Uses the supplied salt and configured iteration count; rejects if Web Crypto fails
 * or secure password hashing is unavailable.
 */
async function hashPassword(
  password: string,
  salt: Uint8Array<ArrayBuffer>,
): Promise<string> {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Secure password hashing is not available in this browser.");
  }

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: PASSWORD_HASH_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  return encodeBase64(new Uint8Array(derivedBits));
}

/**
 * Compares decoded hashes, visiting every byte when their lengths match.
 * Throws if either hash has invalid Base64 encoding.
 */
function hashesMatch(actual: string, expected: string): boolean {
  const actualBytes = decodeBase64(actual);
  const expectedBytes = decodeBase64(expected);
  if (actualBytes.length !== expectedBytes.length) return false;

  let difference = 0;
  for (let index = 0; index < actualBytes.length; index += 1) {
    difference |= actualBytes[index] ^ expectedBytes[index];
  }
  return difference === 0;
}

/**
 * Restores the saved session, or logs a failure and starts signed out.
 * Attempts to remove invalid or unreadable session data before returning null.
 */
function getInitialUser(): AuthUser | null {
  try {
    return readSession();
  } catch (error) {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (storageError) {
      console.error("Unable to clear invalid saved sign-in data.", storageError);
    }
    console.warn("Unable to restore saved sign-in; starting signed out.", error);
    return null;
  }
}

/** Provides browser-local account operations and restores the saved user session. */
function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser);
  const [warning, setWarning] = useState<string | null>(null);

  /**
   * Stores a salted password hash for a new account without signing the user in.
   * Rejects duplicate usernames or emails, hashing failures, and storage errors.
   */
  async function signUp({
    fullname,
    username,
    email,
    password,
  }: SignUpCredentials): Promise<void> {
    const accounts = readAccounts();
    const normalizedUsername = username.trim().toLocaleLowerCase();
    const normalizedEmail = email.trim().toLocaleLowerCase();

    if (
      accounts.some(
        (account) =>
          account.username.toLocaleLowerCase() === normalizedUsername ||
          account.email.toLocaleLowerCase() === normalizedEmail,
      )
    ) {
      throw new Error("An account with that username or email already exists.");
    }

    const salt = crypto.getRandomValues(new Uint8Array(new ArrayBuffer(16)));
    const account: StoredAccount = {
      fullname: fullname.trim(),
      username: username.trim(),
      email: email.trim(),
      salt: encodeBase64(salt),
      passwordHash: await hashPassword(password, salt),
    };
    const latestAccounts = readAccounts();
    if (
      latestAccounts.some(
        (savedAccount) =>
          savedAccount.username.toLocaleLowerCase() === normalizedUsername ||
          savedAccount.email.toLocaleLowerCase() === normalizedEmail,
      )
    ) {
      throw new Error("An account with that username or email already exists.");
    }

    localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify([...latestAccounts, account]),
    );
  }

  /**
   * Verifies credentials, persists the user profile, and updates the active session.
   * Rejects invalid credentials, hashing failures, and storage errors.
   */
  async function logIn({
    username,
    password,
  }: LoginCredentials): Promise<void> {
    const normalizedUsername = username.trim().toLocaleLowerCase();
    const account = readAccounts().find(
      (candidate) =>
        candidate.username.toLocaleLowerCase() === normalizedUsername,
    );

    if (!account) {
      throw new Error("Invalid username or password.");
    }

    const calculatedHash = await hashPassword(
      password,
      decodeBase64(account.salt),
    );
    if (!hashesMatch(calculatedHash, account.passwordHash)) {
      throw new Error("Invalid username or password.");
    }

    const signedInUser: AuthUser = {
      fullname: account.fullname,
      username: account.username,
      email: account.email,
    };
    setUser(signedInUser);
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(signedInUser));
      setWarning(null);
    } catch (error) {
      console.error("Unable to persist the signed-in session.", error);
      setWarning(
        "Signed in, but your session could not be saved. You may need to sign in again after refresh.",
      );
    }
  }

  /** Removes the saved session and clears the active user; throws if storage fails. */
  function logOut(): void {
    setUser(null);
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      setWarning(null);
    } catch (error) {
      console.error("Unable to remove the saved signed-in session.", error);
      setWarning(
        "Signed out, but the saved session could not be removed. Refresh may sign you in again.",
      );
    }
  }

  return (
    <AuthContext.Provider value={{ user, warning, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
