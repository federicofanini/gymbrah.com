import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Onboarding() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Welcome!</h1>
          <p className="text-muted-foreground">Tell us about yourself</p>
        </div>

        <div className="space-y-4">
          <Button size="lg" className="w-full" variant="outline" asChild>
            <Link href="/onboarding/athlete">I&apos;m an Athlete</Link>
          </Button>
          <Button size="lg" className="w-full" variant="default" asChild>
            <Link href="/onboarding/business">
              I&apos;m a Gym or Personal Trainer
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
