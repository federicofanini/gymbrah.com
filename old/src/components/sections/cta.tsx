import { Section } from "@/components/section";
import OutlinedButton from "../ui/outlined-button";
import Link from "next/link";
import { getSubscriberCount } from "@/actions/subscribe-action";
import { Loader2 } from "lucide-react";

export async function CTA({ subscriberCount }: { subscriberCount: number }) {
  return (
    <Section id="cta">
      <div className="overflow-hidden relative text-center py-32 mx-auto">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-30" />

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] text-balance mb-6">
          <span className="relative inline-block px-1">
            Ready to level up your fitness game?
            <span className="hidden md:block absolute -bottom-1 left-0 w-full h-2 md:h-3 bg-primary/40 -rotate-1 -z-10" />
          </span>
        </h2>

        <p className="max-w-2xl text-muted-foreground mb-8 mx-auto text-balance">
          Join <strong>{subscriberCount}</strong> members in the waiting list,
          ready to transform their fitness journey with GymBrah.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/access">
            <OutlinedButton
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-xl group transition-all duration-300"
              variant="secondary"
            >
              Join us
            </OutlinedButton>
          </Link>
        </div>
      </div>
    </Section>
  );
}
