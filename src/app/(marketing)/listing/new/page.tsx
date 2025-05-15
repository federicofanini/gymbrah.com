import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NewBusinessFormWrapper } from "./_components/new-business-form-wrapper";
import { Toaster } from "sonner";

// Revalidate every hour
export const revalidate = 3600;

async function NewBusinessWrapper() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    redirect("/auth/login");
  }

  return (
    <div className="container py-10">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/listing">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Businesses
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Add New Business</h1>
          <p className="text-muted-foreground">
            Fill in the details below to add your business
          </p>
        </div>

        <NewBusinessFormWrapper userId={user.id} />
      </div>
    </div>
  );
}

export default function NewBusinessPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-10">
          <div className="max-w-3xl mx-auto animate-pulse">
            <div className="h-10 w-32 bg-muted rounded mb-6"></div>
            <div className="h-8 w-48 bg-muted rounded mb-2"></div>
            <div className="h-4 w-64 bg-muted rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <NewBusinessWrapper />
    </Suspense>
  );
}
