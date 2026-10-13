import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { APP_CONFIG } from "@/constants";
import { AuthProvider } from "@/components/auth/AuthProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_CONFIG.shortName}`,
    default: `${APP_CONFIG.name} - ${APP_CONFIG.shortName}`,
  },
  description: APP_CONFIG.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-primary-text font-body antialiased flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
