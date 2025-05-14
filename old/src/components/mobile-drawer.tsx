import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { IoMenuSharp, IoTrophyOutline } from "react-icons/io5";
import OutlinedButton from "./ui/outlined-button";
import { Dock, Trophy } from "lucide-react";

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <IoMenuSharp className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6 flex flex-col items-center justify-center">
          <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
          <Link
            href="/"
            title="brand-logo"
            className="flex items-center justify-center"
          >
            <Image
              src="/logo.svg"
              alt="brand-logo"
              width={100}
              height={100}
              className="w-auto h-[40px]"
            />
          </Link>
          <DrawerDescription className="text-center">
            {siteConfig.description}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col gap-4 items-center">
          <Link
            href="/leaderboard"
            className="text-sm hover:text-primary font-mono mb-8 transition-colors flex items-center gap-2"
          >
            <Trophy className="size-4" />
            Leaderboard
          </Link>
          <Link
            href="/mobile"
            className="text-sm hover:text-primary font-mono mb-8 transition-colors flex items-center gap-2"
          >
            <Dock className="size-4" />
            Mobile app
          </Link>
          <Link
            href="/login"
            className="text-sm text-secondary underline mx-auto"
          >
            <OutlinedButton>{siteConfig.hero.cta}</OutlinedButton>
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
