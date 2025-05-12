import { getSubscriberCount } from "@/actions/subscribe-action";
import { getTesterCounts } from "@/actions/tester";
import { SubscribeInput } from "@/components/ui/subscribe-input";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Loader2, CheckCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 3600; // revalidate every hour

export default async function ComingSoon() {
  const subscriberCountResponse = await getSubscriberCount();
  const testerCountsResponse = await getTesterCounts();

  const subscriberCount = subscriberCountResponse.success ? (
    subscriberCountResponse.data.count
  ) : (
    <Loader2 className="w-4 h-4 animate-spin" />
  );

  const testerAthleteCount = testerCountsResponse.success
    ? testerCountsResponse.data.athlete.spotsLeft
    : 0;

  const testerBusinessCount = testerCountsResponse.success
    ? testerCountsResponse.data.business.spotsLeft
    : 0;

  return (
    <div className="inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 py-8">
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold font-mono">
          Join GymBrah Beta
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
          Be among the first to experience the future of fitness. Choose your
          path and join our growing community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <Card className="border-2 border-yellow-200 bg-yellow-50/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Athletes</span>
                <Badge className="bg-yellow-500/20 text-yellow-700">
                  {testerAthleteCount} spots left
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-yellow-600" />
                  <span>Smart location-based search</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-yellow-600" />
                  <span>Category & service filtering</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-yellow-600" />
                  <span>View pricing & contact details</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-yellow-600" />
                  <span>Save favorite gyms & trainers</span>
                </li>
              </ul>
              <Button
                asChild
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                disabled={testerAthleteCount === 0}
              >
                <Link href="https://athlete.gymbrah.com">
                  <Image
                    src="/logo/logo_white.svg"
                    alt="Logo"
                    width={16}
                    height={16}
                    className="sm:w-5 sm:h-5"
                  />
                  <span>
                    {testerAthleteCount === 0
                      ? "Join Waitlist"
                      : "Join as Athlete"}
                  </span>
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-cyan-200 bg-cyan-50/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Fitness Businesses</span>
                <Badge className="bg-cyan-500/20 text-cyan-700">
                  {testerBusinessCount} spots left
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-cyan-600" />
                  <span>Create compelling business profiles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-cyan-600" />
                  <span>Manage bookings & payments</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-cyan-600" />
                  <span>Handle reviews & reputation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-cyan-600" />
                  <span>Premium listing features</span>
                </li>
              </ul>
              <Button
                asChild
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                disabled={testerBusinessCount === 0}
              >
                <Link href="https://coach.gymbrah.com">
                  <Image
                    src="/logo/logo_white.svg"
                    alt="Logo"
                    width={16}
                    height={16}
                    className="sm:w-5 sm:h-5"
                  />
                  <span>
                    {testerBusinessCount === 0
                      ? "Join Waitlist"
                      : "Join as Business"}
                  </span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="w-full max-w-md space-y-4">
          <p className="text-sm text-muted-foreground">
            Or join the waitlist to get early access and updates.
          </p>
          <SubscribeInput />
          <p className="text-primary text-sm">
            <span className="font-bold">{subscriberCount}</span> members on the
            waitlist
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
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
