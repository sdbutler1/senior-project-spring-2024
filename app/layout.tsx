// react components
import React from "react";

// html
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Computer Science Dep | Shaw University",
  description: "Computer Science Department Website",
};

// css
import "../styles/globals.css";

// components
import Providers from "@/context/providers";
import { AuthContextProvider } from "@/context/AuthContext";
import PageWrapper from "@/components/global/PageWrapper";
import Alert from "@/components/global/Alert";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthContextProvider>
            <Alert />
            <PageWrapper>{children}</PageWrapper>
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
