import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { paths } from "@/lib/path";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="container max-w-5xl mx-auto py-20">
      <SectionHeader>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tighter text-center">
          Free During Beta
        </h1>
        <p className="text-muted-foreground text-center text-balance font-medium max-w-2xl mx-auto">
          We&apos;re currently in beta, offering all business features
          completely free while we perfect the platform. Join early to grow your
          fitness business.
        </p>
      </SectionHeader>

      <Card className="mt-12 relative overflow-hidden bg-gradient-to-br from-accent to-background border-accent">
        <div className="absolute top-0 right-0 p-3">
          <div className="text-xs font-semibold text-secondary bg-secondary/15 py-1 px-3 rounded-full">
            Beta Access
          </div>
        </div>

        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <SparklesIcon className="w-12 h-12 text-secondary mb-6" />
            <h2 className="text-2xl font-semibold mb-3">Everything Included</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Get early access to all premium business features while we&apos;re
              in beta. No credit card required.
            </p>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl mb-8">
              <div className="space-y-3">
                <h3 className="font-medium">Business Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="size-5 rounded-full border border-primary/20 flex items-center justify-center">
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                        <path
                          d="M1.5 3.48828L3.375 5.36328L6.5 0.988281"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    Gym listing management
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-5 rounded-full border border-primary/20 flex items-center justify-center">
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                        <path
                          d="M1.5 3.48828L3.375 5.36328L6.5 0.988281"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    Class schedule publishing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-5 rounded-full border border-primary/20 flex items-center justify-center">
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                        <path
                          d="M1.5 3.48828L3.375 5.36328L6.5 0.988281"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    Member analytics
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Premium Benefits</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="size-5 rounded-full border border-primary/20 flex items-center justify-center">
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                        <path
                          d="M1.5 3.48828L3.375 5.36328L6.5 0.988281"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    Early feature access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-5 rounded-full border border-primary/20 flex items-center justify-center">
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                        <path
                          d="M1.5 3.48828L3.375 5.36328L6.5 0.988281"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-5 rounded-full border border-primary/20 flex items-center justify-center">
                      <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                        <path
                          d="M1.5 3.48828L3.375 5.36328L6.5 0.988281"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    Community access
                  </li>
                </ul>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <Link href={paths.api.login}>List your gym now</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground text-center mt-8">
        After the beta period, we&apos;ll introduce business plans. Beta users
        may receive special benefits.
      </p>
    </div>
  );
}
