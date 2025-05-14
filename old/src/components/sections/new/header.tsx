"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { GithubStars } from "../github-stars";
import OutlinedButton from "../../ui/outlined-button";
import Image from "next/image";
import { MobileMenu } from "./mobile-menu";

function SignInButton() {
  return (
    <Link
      href="/access"
      className="text-xs text-secondary underline hidden md:block"
    >
      <OutlinedButton
        className="text-xs h-6 bg-primary text-white"
        variant="secondary"
      >
        Start now
      </OutlinedButton>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();

  const links = [
    {
      href: "/exercises",
      label: "1,300+ Exercises",
      isSpecial: true,
    },
    { href: "/gyms", label: "Gyms" },
    { href: "/pts", label: "PTs" },
    { href: "#pricing", label: "Pricing" },
    {
      component: <SignInButton />,
      className:
        pathname.split("/").length === 2
          ? "text-primary"
          : "text-secondary hover:text-primary",
    },
  ];

  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between sm:mx-auto py-4 px-4 md:px-6 lg:px-8 max-w-screen-xl">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/logo_black.svg"
            alt="GymBrah"
            width={50}
            height={50}
            className="h-[40px] w-auto"
          />
          <span className="text-2xl sm:text-3xl font-extrabold font-mono">
            GymBrah
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-sm">
          <Link
            href="https://github.com/federicofanini/gymbrah.com"
            className="hidden sm:block"
          >
            <Suspense fallback={<GithubStars />}>
              <GithubStars />
            </Suspense>
          </Link>

          {links.map((link, i) =>
            link.component ? (
              <div
                key={i.toString()}
                className={cn(
                  "text-primary hover:text-primary transition-colors",
                  link.className
                )}
              >
                {link.component}
              </div>
            ) : (
              <Link
                href={link.href!}
                className={cn(
                  "text-primary hover:underline underline-offset-4 transition-colors hidden md:block",
                  link.className,
                  pathname?.endsWith(link.href) && "text-primary",
                  link.isSpecial &&
                    "relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:animate-pulse"
                )}
                key={link.href}
                prefetch
              >
                {link.label}
              </Link>
            )
          )}
        </div>
        <MobileMenu />
      </div>
    </div>
  );
}
