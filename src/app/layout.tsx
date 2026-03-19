import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Invariant",
    template: "%s | Invariant",
  },
  description:
    "An interactive Computer Science education platform. Algorithm visualizations, CS pioneer profiles, and writing on the principles that persist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 text-zinc-50">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-800 px-6 py-8 text-center">
          <p className="font-mono text-xs tracking-widest text-zinc-600">
            INVARIANT — The principles that persist.
          </p>
        </footer>
      </body>
    </html>
  );
}
