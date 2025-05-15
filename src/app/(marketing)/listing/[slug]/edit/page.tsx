import { Suspense } from "react";
import { getBusinessBySlug } from "@/packages/database/business";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BusinessFormWrapper } from "./_components/business-form-wrapper";

type Props = {
  params: { slug: string } & Promise<{ slug: string }>;
};

// Revalidate every hour
export const revalidate = 3600;

async function EditBusinessWrapper({ slug }: { slug: string }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    redirect("/auth/login");
  }

  const result = await getBusinessBySlug(slug);
  if (!result.success) {
    notFound();
  }

  // Check if user owns the business
  if (result.data.ownerId !== user.id) {
    redirect("/listing");
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/listing">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Businesses
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Edit Business</h1>
          <p className="text-muted-foreground">
            Update your business information
          </p>
        </div>

        <BusinessFormWrapper initialData={result.data} />
      </div>
    </div>
  );
}

export default function EditBusinessPage({ params }: Props) {
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
      <EditBusinessWrapper slug={params.slug} />
    </Suspense>
  );
}
