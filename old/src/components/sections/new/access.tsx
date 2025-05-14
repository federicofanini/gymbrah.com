import { getSubscriberCount } from "@/actions/subscribe-action";
import { SubscribeInput } from "@/components/ui/subscribe-input";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export const revalidate = 3600; // revalidate every hour

export async function ComingSoon() {
  const subscriberCountResponse = await getSubscriberCount();
  const subscriberCount = subscriberCountResponse.success ? (
    subscriberCountResponse.data.count
  ) : (
    <Loader2 className="w-4 h-4 animate-spin" />
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-[320px] sm:max-w-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-bold font-mono">
          Coming Soon
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg">
          Working hard to bring you the best gym tracking experience.
          <br />
          Join our waitlist to get early access and updates.
        </p>

        <p className="text-primary text-sm sm:text-base">
          <span className="font-bold">{subscriberCount}</span> members on the
          waitlist
        </p>

        <SubscribeInput />

        <div className="flex flex-col items-center gap-4 w-full">
          <span className="text-sm sm:text-base text-muted-foreground">
            Get access to the beta version of the app
          </span>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              asChild
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-primary text-primary-foreground"
            >
              <Link
                href="https://book.stripe.com/8wM3eZ0KP1CVcRGaEL"
                target="_blank"
              >
                <Image
                  src="/logo/logo_white.svg"
                  alt="Logo"
                  width={16}
                  height={16}
                  className="sm:w-5 sm:h-5"
                />
                <span className="text-sm sm:text-base">
                  Access for Business
                </span>
              </Link>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-primary text-primary-foreground "
            >
              <Link
                href="https://book.stripe.com/00g7vf2SX2GZcRG008"
                target="_blank"
              >
                <Image
                  src="/logo/logo_white.svg"
                  alt="Logo"
                  width={16}
                  height={16}
                  className="sm:w-5 sm:h-5"
                />
                <span className="text-sm sm:text-base">
                  Access for Athletes
                </span>
              </Link>
            </Button>
          </div>

          <div className="text-xs sm:text-sm text-muted-foreground flex flex-col items-center gap-2 mt-4">
            <p className="text-center max-w-[280px] sm:max-w-sm">
              For all the beta users, I&apos;ll love to hear your feedback and
              build the app together!
            </p>
            <p className="text-center mt-6">Need support or have questions?</p>
            <a
              href="https://twitter.com/FedericoFan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1.5"
            >
              <Icons.twitter className="size-3 sm:size-4" />
              <span>Reach out on X @FedericoFan</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
