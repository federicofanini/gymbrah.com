import { Suspense } from "react";
import { getBusinessesByOwner } from "@/packages/database/business";
import { BusinessList } from "@/components/private/business/business-list";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { paths } from "@/lib/path";

// Revalidate every hour
export const revalidate = 3600;

async function BusinessListWrapper() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    redirect(paths.api.login);
  }

  const result = await getBusinessesByOwner(user.id);
  const businesses = result.success ? result.data.businesses : [];

  return (
    <div className="container py-20 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Businesses</h1>
          <p className="text-muted-foreground">
            Manage your gyms and fitness facilities
          </p>
        </div>
        <Button asChild>
          <Link href="/listing/new">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Business
          </Link>
        </Button>
      </div>

      {businesses.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold mb-2">No businesses yet</h2>
          <p className="text-muted-foreground mb-4">
            Get started by adding your first business
          </p>
          <Button asChild>
            <Link href="/listing/new">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Business
            </Link>
          </Button>
        </div>
      ) : (
        <BusinessList businesses={businesses} />
      )}
    </div>
  );
}

export default function ListingPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-10">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-muted rounded mb-2"></div>
            <div className="h-4 w-64 bg-muted rounded mb-8"></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <BusinessListWrapper />
    </Suspense>
  );
}
