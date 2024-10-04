"use client";

import { createContext, ReactNode } from "react";
import { use } from "react";

type Auth = {
  isAuth: boolean;
  user: any;
};

type AuthPromise = Promise<Auth | null>;

const AuthContext = createContext<AuthPromise | null>(null);

export function useAuthContext() {
  let authPromise = use(AuthContext);
  if (!authPromise) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  const auth = use(authPromise);
  return auth;
}

export function AuthProvider({
  children,
  authPromise,
}: {
  children: ReactNode;
  authPromise: AuthPromise;
}) {
  return (
    <AuthContext.Provider value={authPromise}>{children}</AuthContext.Provider>
  );
}
