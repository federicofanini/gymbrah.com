"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserIcon, XIcon, CheckIcon, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface Athlete {
  id: string;
  full_name: string;
  goal: string;
  gender_age: string;
  status: string;
}

interface AthletesProps {
  athletes: Athlete[];
}

export function Athletes({ athletes: initialAthletes }: AthletesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const t = useTranslations("private-business.athletes-page");

  const filteredAthletes = initialAthletes.filter((athlete) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      athlete.full_name.toLowerCase().includes(searchLower) ||
      athlete.goal.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-8">
      <div className="w-full border border-border rounded-lg">
        <div className="p-3 md:p-6 flex flex-col md:flex-row md:justify-between md:items-center border-b gap-3 md:gap-0">
          <div className="space-y-1">
            <h2 className="text-base md:text-lg font-medium">{t("title")}</h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
          <div className="relative w-full md:max-w-sm">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search")}
              className="pl-8 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto px-2 py-1 md:px-6 md:py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px] md:min-w-[120px]">
                  {t("full-name")}
                </TableHead>
                <TableHead className="hidden md:table-cell min-w-[100px]">
                  {t("goal")}
                </TableHead>
                <TableHead className="hidden md:table-cell min-w-[100px]">
                  {t("gender-age")}
                </TableHead>
                <TableHead className="min-w-[80px] md:min-w-[100px]">
                  {t("status")}
                </TableHead>
                <TableHead className="text-right min-w-[100px] md:min-w-[160px]">
                  {t("actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAthletes.map((athlete) => (
                <TableRow key={athlete.id}>
                  <TableCell className="font-medium">
                    {athlete.full_name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="whitespace-nowrap">
                      {athlete.goal}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell whitespace-nowrap">
                    {athlete.gender_age}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        athlete.status === "Active" ? "success" : "destructive"
                      }
                      className="whitespace-nowrap"
                    >
                      {athlete.status === "Active" ? (
                        <CheckIcon className="size-3.5 mr-1" />
                      ) : (
                        <XIcon className="size-3.5 mr-1" />
                      )}
                      {athlete.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="sm:hidden"
                    >
                      <Link href={`/business/athletes/${athlete.id}`}>
                        <UserIcon className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="hidden sm:inline-flex whitespace-nowrap"
                    >
                      <Link href={`/business/athletes/${athlete.id}`}>
                        <UserIcon className="mr-2 size-4" />
                        {t("athlete-page")}
                      </Link>
                    </Button>
                    {/*<Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive/90"
                    >
                      <TrashIcon className="size-4" />
                    </Button>*/}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
