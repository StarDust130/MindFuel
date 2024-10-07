"use client";
import { createContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}
