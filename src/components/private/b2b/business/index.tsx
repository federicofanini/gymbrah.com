"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryState } from "nuqs";
import { Overview } from "./overview";
import { Clients } from "./clients";
import { useTranslations } from "next-intl";

export interface BusinessPageProps {
  clientStats: {
    totalClients: number;
    percentageChange: number;
    monthlyRevenue: {
      value: number;
      percentageChange: number;
    };
    activeSessions: {
      value: number;
      percentageChange: number;
    };
  };
  clients: {
    id: string;
    fullName: string;
    subscription?: {
      sub_type: string;
      renewal_date: Date;
    };
  }[];
}

export function BusinessPage({ clientStats, clients }: BusinessPageProps) {
  const [tab, setTab] = useQueryState("tab", {
    defaultValue: "overview",
  });

  const t = useTranslations("private-business");

  const tabs = [
    {
      id: "overview",
      title: t("overview"),
    },
    {
      id: "clients",
      title: t("clients"),
    },
  ];

  return (
    <div className="w-full px-4 md:px-8 py-4">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="justify-start rounded-none h-auto p-0 bg-transparent space-x-4 md:space-x-6 overflow-x-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="rounded-none border-b-2 border-transparent text-primary data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2 text-sm md:text-base whitespace-nowrap"
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Overview clientStats={clientStats} />
        </TabsContent>

        <TabsContent value="clients" className="mt-6">
          <Clients clients={clients} totalClients={clientStats.totalClients} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
