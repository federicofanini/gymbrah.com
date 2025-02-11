"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import {
  MdAccessTime,
  MdAttachMoney,
  MdSportsGymnastics,
} from "react-icons/md";
import { useTranslations } from "next-intl";

export interface OverviewProps {
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
}

export const stats = [
  {
    title: "Total Clients",
    value: (clientStats: OverviewProps["clientStats"]) =>
      clientStats.totalClients.toString(),
    change: (clientStats: OverviewProps["clientStats"]) =>
      `${clientStats.percentageChange}%`,
    isPositive: (clientStats: OverviewProps["clientStats"]) =>
      clientStats.percentageChange >= 0,
    icon: MdSportsGymnastics,
  },
  {
    title: "Monthly Revenue",
    value: (clientStats: OverviewProps["clientStats"]) =>
      `$${clientStats.monthlyRevenue.value.toLocaleString()}`,
    change: (clientStats: OverviewProps["clientStats"]) =>
      `${clientStats.monthlyRevenue.percentageChange}%`,
    isPositive: (clientStats: OverviewProps["clientStats"]) =>
      clientStats.monthlyRevenue.percentageChange >= 0,
    icon: MdAttachMoney,
  },
  {
    title: "Active Sessions",
    value: (clientStats: OverviewProps["clientStats"]) =>
      clientStats.activeSessions.value.toLocaleString(),
    change: (clientStats: OverviewProps["clientStats"]) =>
      `${clientStats.activeSessions.percentageChange}%`,
    isPositive: (clientStats: OverviewProps["clientStats"]) =>
      clientStats.activeSessions.percentageChange >= 0,
    icon: MdAccessTime,
  },
];

export function Overview({ clientStats }: OverviewProps) {
  const t = useTranslations("private-business");

  const stats = [
    {
      title: t("stats.total-clients"),
      value: clientStats.totalClients.toString(),
      change: `${clientStats.percentageChange}%`,
      isPositive: clientStats.percentageChange >= 0,
      icon: MdSportsGymnastics,
    },
    {
      title: t("stats.monthly-revenue"),
      value: clientStats.monthlyRevenue.value.toLocaleString(),
      change: `${clientStats.monthlyRevenue.percentageChange}%`,
      isPositive: clientStats.monthlyRevenue.percentageChange >= 0,
      icon: MdAttachMoney,
    },
    {
      title: t("stats.active-sessions"),
      value: clientStats.activeSessions.value.toLocaleString(),
      change: `${clientStats.activeSessions.percentageChange}%`,
      isPositive: clientStats.activeSessions.percentageChange >= 0,
      icon: MdAccessTime,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <Badge
                    variant={stat.isPositive ? "success" : "destructive"}
                    className="text-xs"
                  >
                    {stat.isPositive ? (
                      <ArrowUpIcon className="mr-1 size-3" />
                    ) : (
                      <ArrowDownIcon className="mr-1 size-3" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
              </div>
              <stat.icon className="size-8 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              "Sarah Johnson checked in at 9:15 AM",
              "New member registration: Mike Wilson",
              "Monthly payment received from John Smith",
              "Class 'Advanced HIIT' is fully booked",
              "Equipment maintenance scheduled for tomorrow",
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="size-2 rounded-full bg-primary" />
                {activity}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium mb-4">Upcoming Classes</h3>
          <div className="space-y-4">
            {[
              { name: "Morning Yoga", time: "7:00 AM", spots: "3 spots left" },
              { name: "CrossFit Basics", time: "9:30 AM", spots: "Full" },
              { name: "Spinning", time: "12:00 PM", spots: "8 spots left" },
              { name: "Boxing", time: "5:30 PM", spots: "2 spots left" },
              { name: "Evening HIIT", time: "7:00 PM", spots: "5 spots left" },
            ].map((cls, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{cls.name}</p>
                  <p className="text-sm text-muted-foreground">{cls.time}</p>
                </div>
                <Badge
                  variant={cls.spots === "Full" ? "destructive" : "secondary"}
                >
                  {cls.spots}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
