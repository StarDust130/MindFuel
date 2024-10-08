import type { Metadata } from "next";
import {Lora}  from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "MindFuel",
  description: "A Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${lora.className} antialiased`}>{children}</body>
    </html>
  );
}
