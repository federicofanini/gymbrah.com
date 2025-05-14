"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export function LogoIcon() {
  const { theme } = useTheme();
  const logoSrc =
    theme === "dark" ? "/logo/logo_white.png" : "/logo/logo_black.png";

  return (
    <Image
      src={logoSrc}
      alt="GB"
      width={30}
      height={30}
      quality={100}
      priority
    />
  );
}
