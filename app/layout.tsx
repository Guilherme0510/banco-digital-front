import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AuthProvider } from "../contexts/AuthContext";
// @ts-ignore: global CSS import type declarations
import "./global.css";

export const metadata: Metadata = {
  title: "Digital Bank",
  description: "Seu banco, simples e moderno.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased">
        <AuthProvider>
          {children}
          <Toaster theme="dark" position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
