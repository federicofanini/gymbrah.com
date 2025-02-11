"use client";

import {
  Sidebar as SidebarBase,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/routing";
import { LogoIcon } from "@/components/logo";
import { sidebarItems } from "./sidebar-items";

export function Sidebar() {
  const pathname = usePathname();

  const navigation = sidebarItems.map((item) => ({
    ...item,
    isActive: pathname === item.path,
  }));

  return (
    <div className="sticky top-0 h-screen z-10 md:flex hidden">
      <SidebarBase
        collapsible="none"
        className="border-r border-primary bg-noise overflow-hidden"
      >
        <SidebarHeader className="flex justify-center items-center h-[70px] border-b border-primary">
          <Link href="/business">
            <LogoIcon />
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="p-0">
              <SidebarMenu className="divide-y divide-primary h-full flex flex-col">
                {navigation.map((item, index) => (
                  <SidebarMenuItem key={item.path}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            isActive={item.isActive}
                            className={cn("[&>svg]:size-5 size-[70px]", {
                              "opacity-50": !item.isActive,
                              "border-b border-primary":
                                index === navigation.length - 1,
                            })}
                          >
                            <Link href={item.path}>
                              <item.icon />
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </SidebarBase>
    </div>
  );
}
