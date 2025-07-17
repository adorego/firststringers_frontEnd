import type { Metadata } from "next";
import {Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav-bar";
import LoadingWrapper from "@/components/loading-wrapper";

const poppinsSans = Poppins({
  weight:"400",
  variable: "--font-poppins-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "First Stringers ",
  description: "First Stringers is an AI-Powered social network for athlete development, discovery, and recruiting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsSans.variable} antialiased`}
      >
        {/* <Navbar /> */}
        {/* <LoadingWrapper>{children}</LoadingWrapper> */}
        {children}
      </body>
    </html>
  );
}
