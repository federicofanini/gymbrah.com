import { Suspense } from "react";
import { AthletesTable } from "@/components/private/b2b/athletes/athletes-table";
import { getAthletes } from "@/actions/business/athletes/get-athletes";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = "force-dynamic";

async function AthletesPageWrapper() {
  const result = await getAthletes();

  if (!result?.data?.success || !result.data) {
    throw new Error("Failed to load athletes");
  }

  return <AthletesTable athletes={result.data.data} />;
}

function LoadingSkeleton() {
  return (
    <div className="w-full px-4 md:px-8 py-4">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Athletes() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <AthletesPageWrapper />
    </Suspense>
  );
}
