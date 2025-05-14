"use client";

import { siteConfig } from "@/lib/config";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useRef } from "react";

interface NavItem {
  name: string;
  path: string;
}

// Transform the nav links to match our NavItem interface
const navs: NavItem[] = siteConfig.nav.links.map((link) => ({
  name: link.name,
  // Ensure all paths have a leading slash
  path: link.href.startsWith("/") ? link.href : `/${link.href}`,
}));

export function NavMenu() {
  const ref = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    // Normalize paths for comparison
    const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;
    const normalizedPathname = pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

    return (
      normalizedPathname === normalizedPath ||
      (normalizedPath !== "/" && normalizedPathname.startsWith(normalizedPath))
    );
  };

  return (
    <div className="w-full hidden md:block">
      <ul
        className="relative mx-auto flex w-fit h-11 px-2 items-center justify-center"
        ref={ref}
      >
        {navs.map((item) => (
          <li
            key={item.name}
            className="z-10 cursor-pointer h-full flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200 relative"
          >
            <Link
              href={item.path}
              className={`${
                isActive(item.path)
                  ? "text-primary"
                  : "text-primary/60 hover:text-primary"
              } tracking-tight`}
            >
              {item.name}
              {isActive(item.path) && (
                <span className="absolute bottom-1 left-0 right-0 mx-auto w-1/2 h-0.5 bg-primary rounded-full"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
