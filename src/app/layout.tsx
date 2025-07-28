import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsSans = Poppins({
  weight: "400",
  variable: "--font-poppins-sans",
  subsets: ["latin"],
});

// ✅ Esto será usado automáticamente por Next.js para <head>
export const metadata: Metadata = {
  title: "First Stringers",
  description:
    "First Stringers is an AI-Powered social network for athlete development, discovery, and recruiting.",
  metadataBase: new URL("https://firststringersfrontend-staging.up.railway.app"),
  openGraph: {
    title: "First Stringers",
    description:
      "The AI-powered social network for athlete development, discovery, and recruiting.",
    url: "https://firststringersfrontend-staging.up.railway.app",
    siteName: "First Stringers",
    images: [
      {
        url: "/og-image.png", // ✅ Asegurate que exista en /public
        width: 1200,
        height: 630,
        alt: "First Stringers Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "First Stringers",
    description:
      "The AI-powered social network for athlete development, discovery, and recruiting.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico", // ✅ Asegurate que exista en /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppinsSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
