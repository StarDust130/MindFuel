import type { Metadata } from "next";
import {Lora}  from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    template: "%s : MindFuel",
    default: "Welcome: MindFuel",
  },
  description:
    "MindFuel is a learning platform that helps you learn new things and improve your skills.",
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
