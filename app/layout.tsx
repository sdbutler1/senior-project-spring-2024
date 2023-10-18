"use client";

// react components
import { usePathname } from "next/navigation";

// css
import "../styles/globals.css";

// components
import SideBar from "../components/global/sideBar/SideBar";
import Providers from "./providers";
import { AuthContextProvider } from "./context/AuthContext";
import useSidebarStore from "../components/global/sideBar/sideBarStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isSidebarOpen } = useSidebarStore();
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="relative h-auto flex items-center">
            <SideBar />
            <div
              className={`relative h-screen ${
                (isSidebarOpen && pathname !== "/login")
                  ? "w-[100rem] -right-80 transition-width duration-700"
                  : "w-[115rem] -right-20 transition-width duration-700"
              }`}
            >
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
