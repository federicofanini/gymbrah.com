"use server";

import { NavMenu } from "@/components/nav-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { NavUserHome } from "../private/nav-user-home";
import { getAuthUser } from "@/packages/auth/get-user";

export async function Navbar() {
  const user = await getAuthUser();

  return (
    <header
      className={cn(
        "sticky z-50 mx-4 flex justify-center transition-all duration-300 md:mx-0",
        "top-6"
      )}
    >
      <div className="w-full sm:w-[1000px]">
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-xl transition-all duration-300 xl:px-0",
            "px-2 border border-border backdrop-blur-lg bg-background/75"
          )}
        >
          <div className="flex h-[56px] items-center justify-between p-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo/logo_black.svg"
                alt="GymBrah"
                width={32}
                height={32}
              />
              <p className="text-2xl font-semibold text-primary font-mono">
                GymBrah
              </p>
            </Link>

            <NavMenu />

            <div className="flex flex-row items-center gap-1 md:gap-3 shrink-0">
              <div className="flex items-center space-x-6">
                {user ? (
                  <NavUserHome />
                ) : (
                  <Link
                    href="/api/auth/login"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
