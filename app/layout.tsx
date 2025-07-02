// In app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Import your custom ThemeProvider from the new file
import { ThemeProvider } from "./ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swam Pyae Aung's Portfolio",
  description: "Modern & Minimal JS Mastery Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/exp1.svg" sizes="any" />
      </head>
      <body className={inter.className}>
        {/*
          Now, we wrap the children with our custom ThemeProvider component,
          which is correctly marked as a "use client" component.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
