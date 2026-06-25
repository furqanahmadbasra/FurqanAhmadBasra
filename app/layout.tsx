import type { Metadata } from "next";
import { AnimatedBackdrop } from "@/components/layout/AnimatedBackdrop";
import { CustomCursor } from "@/components/interactive/CustomCursor";
import { ClickSpark } from "@/components/interactive/ClickSpark";
import "./globals.css";

export const metadata: Metadata = {
  title: "Furqan Ahmad Basra | AI/ML and Full-Stack Developer",
  description:
    "Clean portfolio for Furqan Ahmad Basra, a NUST computer science student building AI/ML, full-stack, search, compiler, and systems projects.",
  keywords: [
    "Furqan Ahmad Basra",
    "AI engineer",
    "ML engineer",
    "full-stack developer",
    "portfolio",
    "RAG",
    "NLP",
    "search engine",
    "systems engineering",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Furqan Ahmad Basra" }],
  openGraph: {
    title: "Furqan Ahmad Basra | Portfolio",
    description: "AI/ML, full-stack, and systems engineering projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AnimatedBackdrop />
        <CustomCursor />
        <ClickSpark />
        {children}
      </body>
    </html>
  );
}