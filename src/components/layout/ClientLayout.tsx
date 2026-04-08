"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { AuthProvider } from "@/context/AuthContext";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <AuthProvider>
      {isLoginPage ? (
        children
      ) : (
        <>
          <Header />
          <div className="flex mt-[54px] min-h-[calc(100vh-54px)]">
            <Sidebar />
            <main className="ml-[272px] flex-1 p-8 max-w-[980px]">
              {children}
            </main>
          </div>
        </>
      )}
    </AuthProvider>
  );
}
