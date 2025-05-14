"use client";

import { Section } from "@/components/section";
import OutlinedButton from "@/components/ui/outlined-button";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { getSubscriberCount } from "@/actions/subscribe-action";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function Community() {
  const [subscriberCount, setSubscriberCount] = useState<React.ReactNode>(
    <Loader2 className="w-4 h-4 animate-spin" />
  );

  useEffect(() => {
    async function fetchSubscriberCount() {
      const response = await getSubscriberCount();
      if (response.success) {
        setSubscriberCount(response.data.count);
      }
    }
    fetchSubscriberCount();
  }, []);

  return (
    <Section id="community">
      <div className="overflow-hidden relative text-center py-32 mx-auto">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-500/20 via-transparent to-transparent opacity-30" />

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] text-balance mb-6">
          <span className="relative inline-block px-1">
            Join our Discord community
            <span className="hidden md:block absolute -bottom-1 left-0 w-full h-2 md:h-3 bg-indigo-400 -rotate-1 -z-10" />
          </span>
        </h2>

        <p className="max-w-2xl text-muted-foreground mb-8 mx-auto text-balance">
          Connect with fitness enthusiasts, share your progress, get inspired,
          and be part of something bigger. Early members get exclusive access to
          new features and direct contact with the founders.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="https://discord.gg/f7fSp6vQcK" target="_blank">
            <OutlinedButton
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xl group transition-all duration-300"
              variant="secondary"
            >
              <Icons.discord className="size-6 group-hover:scale-110 transition-transform" />
              Join Discord
            </OutlinedButton>
          </Link>
        </div>
      </div>
    </Section>
  );
}
