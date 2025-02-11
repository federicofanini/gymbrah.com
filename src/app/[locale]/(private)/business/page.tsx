import { Suspense } from "react";
import { BusinessPage } from "@/components/private/b2b/business";
import {
  getClientStats,
  getClients,
} from "@/actions/business/client/get-clients";
import { getRevenueStats } from "@/actions/business/client/get-revenues";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

async function BusinessPageWrapper() {
  const [clientStatsResponse, clientsResponse, revenueStatsResponse] =
    await Promise.all([
      getClientStats(),
      getClients({ page: 1, limit: 10 }),
      getRevenueStats(),
    ]);

  const clientStats = {
    totalClients: clientStatsResponse?.data?.success
      ? clientStatsResponse.data.data.totalClients
      : 0,
    percentageChange: clientStatsResponse?.data?.success
      ? clientStatsResponse.data.data.percentageChange
      : 0,
    monthlyRevenue: {
      value: revenueStatsResponse?.data?.success
        ? revenueStatsResponse.data.data.currentMonthRevenue
        : 0,
      percentageChange: revenueStatsResponse?.data?.success
        ? revenueStatsResponse.data.data.percentageChange
        : 0,
    },
    activeSessions: {
      value: 0,
      percentageChange: 0,
    },
  };

  const clients = clientsResponse?.data?.success
    ? clientsResponse.data.data.clients.map((client: any) => ({
        ...client,
        fullName:
          client.athlete?.name && client.athlete?.surname
            ? `${client.athlete.name} ${client.athlete.surname}`
            : "Unknown Athlete",
      }))
    : [];

  return <BusinessPage clientStats={clientStats} clients={clients} />;
}

function LoadingSkeleton() {
  return (
    <div className="w-full px-4 md:px-8 py-4 space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Business() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <BusinessPageWrapper />
    </Suspense>
  );
}
