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
import SideBar from "../components/global/SideBar";
import TopBar from "../components/global/topBar";
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
          <div className="relative w-screen h-auto flex flex-col items-center justify-center">
            <AuthContextProvider>
              <TopBar />
              <div className="flex items-center justify-center">
                <SideBar />
                {children}
              </div>
            </AuthContextProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
