import { LogoIcon } from "@/components/logo";
import { MobileMenu } from "@/components/private/b2b/mobile-menu";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/private/b2b/user-menu";
import { SettingsButton } from "@/components/private/b2b/settings-button";
import { BusinessCodeDisplay } from "./business-code";
import { ChangeLanguage } from "../change-lang";

export function Header() {
  return (
    <div className="h-[70px] border-b w-full flex items-center md:px-4 sticky top-0 bg-background z-10 bg-noise border-primary">
      <div className="flex md:hidden border-r border-primary h-full items-center justify-center size-[70px]">
        <Link href="/" className="block">
          <LogoIcon />
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <BusinessCodeDisplay />
      </div>

      <div className="flex justify-end items-center">
        <div className="flex space-x-8 items-center">
          <SettingsButton />
        </div>

        <div className="flex space-x-8 items-center">
          <ThemeToggle />
        </div>

        <div className="flex space-x-8 items-center">
          <ChangeLanguage />
        </div>

        <div className="hidden md:flex pl-4 space-x-8 items-center">
          <UserMenu />
        </div>
      </div>

      <div className="flex md:hidden border-l border-primary h-full items-center justify-center size-[70px]">
        <MobileMenu />
      </div>
    </div>
  );
}
