"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export function BreadcrumbClient() {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      // Check if segment is a UUID (simple check for length and alphanumeric)
      const isUuid = segment.length === 36 && /^[0-9a-f-]{36}$/i.test(segment);
      const label = isUuid
        ? `${segment.slice(0, 2)}...${segment.slice(-2)}`
        : segment.charAt(0).toUpperCase() + segment.slice(1);

      return {
        label,
        href: "/" + array.slice(0, index + 1).join("/"),
      };
    });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {segments.map((segment, index) => (
          <BreadcrumbItem key={segment.href}>
            {index === segments.length - 1 ? (
              <BreadcrumbPage>{segment.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink href={segment.href}>
                  {segment.label}
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
