import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Universal Action Workspace",
  description: "A manual-first workspace for orchestrating complex actions across resources and modules.",
};

/**
 * ROOT LAYOUT
 * 
 * The primary layout wrapper for the entire application.
 * It establishes the global navigation (Sidebar) and the main content viewing area.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`}>
      <body className="flex min-h-screen">
        {/* Global Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <main style={{ 
          marginLeft: 'var(--sidebar-width)', 
          flex: 1,
          padding: '2rem',
          minHeight: '100vh',
          background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent)'
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}
