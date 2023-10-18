// html
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "To be Decided",
  description: "Computer Science Department Website",
};

// react components

// css
import "../styles/globals.css";

// components
import SideBar from "../components/global/sideBar/SideBar";
import Providers from "./providers";
import { AuthContextProvider } from "./context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="relative w-screen h-auto flex items-center">
            <AuthContextProvider>
              <SideBar />
              {children}
            </AuthContextProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
