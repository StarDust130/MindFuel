import AuthProvider from "@/context/auth-context";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <AuthProvider>{children}</AuthProvider>
    </main>
  );
}
