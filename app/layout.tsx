import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atharv R Gachchi - Upcoming Coder",
  description: "Portfolio of Atharv R Gachchi, a software development student.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Added dark class for default dark mode */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}