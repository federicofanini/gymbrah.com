"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function DesktopCommandMenuSignIn() {
  return (
    <div className="flex h-full flex-col">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={100}
        height={100}
        className="absolute top-8 left-8"
      />

      <div className="flex items-center w-full justify-center h-full">
        <a href="gymbrah://">
          <Button variant="outline">Login to GymBrah</Button>
        </a>
      </div>
    </div>
  );
}
