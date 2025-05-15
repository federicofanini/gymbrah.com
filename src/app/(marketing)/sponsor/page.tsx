import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DR } from "@/components/sections/dr";

export const dynamic = "force-static";

export default function SponsorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6">
      <div className="w-full max-w-3xl mx-auto py-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-medium tracking-tight">
              Become a Sponsor
            </h1>
            <p className="text-lg text-muted-foreground">
              Support our mission to make fitness accessible to everyone. Your
              sponsorship helps us continue building and improving our platform.
            </p>
          </div>

          <div className="grid gap-8">
            <div className="rounded-lg border p-8 space-y-4">
              <h2 className="text-xl font-medium">Monthly Sponsor</h2>
              <p className="text-muted-foreground">
                Get your logo featured on our homepage.
              </p>
              <p className="text-xs text-muted-foreground">
                Preferred partners are fitness businesses.
              </p>

              <p className="text-3xl font-medium">$49/month</p>
              <Link
                href="https://buy.stripe.com/14kaHr3X1a9r4la009"
                className="inline-block px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                target="_blank"
              >
                Reserve your spot
              </Link>
              <p className="text-xs text-muted-foreground italic">
                If you have any questions, reach me at{" "}
                <Link href="mailto:sponsors@example.com" className="underline">
                  fedef@gymbrah.com
                </Link>
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <h2 className="text-2xl font-medium">Why Sponsor?</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Get backlinked on 30+ DR website </li>
              <li>
                • Help us improve open-source tools for the fitness community
              </li>
              <li>• Connect with others who care about health and movement</li>
              <li>
                • Contribute to a more open and accessible fitness ecosystem
              </li>
            </ul>
          </div>
          <DR />
        </div>
      </div>
    </main>
  );
}
