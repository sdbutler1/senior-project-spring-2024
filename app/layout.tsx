// html
import type { Metadata } from "next";

// css
import "../styles/globals.css";

// components
import SideBar from "../components/global/SideBar";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "To be Decided",
  description: "Computer Science Department Website",
};

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
            <SideBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
