"use client";

import { MobileDrawer } from "@/components/mobile-drawer";
import OutlinedButton from "../ui/outlined-button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChangeLanguage } from "./change-language";

export function Header() {
  const t = useTranslations("header");
  // const pathname = usePathname();

  return (
    <header className="sticky top-0 h-[var(--header-height)] z-50 p-0 bg-background/60 backdrop-blur mx-2">
      <div className="flex justify-between items-center container mx-auto p-2">
        <Link
          href="/"
          title="brand-logo"
          className="relative flex items-center space-x-2"
        >
          <Image
            src="/logo/logo_black.svg"
            alt="GymBrah"
            width={50}
            height={50}
            className="h-[40px] w-auto"
          />
          <span className="text-3xl font-extrabold font-mono">GymBrah</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2">
            <ChangeLanguage />

            <Link href="/login" className="text-xs text-secondary underline">
              <OutlinedButton
                className="text-xs h-6 bg-primary text-white"
                variant="secondary"
              >
                {t("button")}
              </OutlinedButton>
            </Link>
          </div>
        </div>
        <div className="mt-2 cursor-pointer block lg:hidden">
          <MobileDrawer />
        </div>
      </div>
      <hr className="absolute w-full bottom-0" />
    </header>
  );
}
