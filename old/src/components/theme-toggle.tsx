"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  // Don't show in production
  if (process.env.NODE_ENV === "production") return null;
  return (
    <Button
      variant="ghost"
      size="icon"
      className="[&>svg]:size-5 size-[70px] hidden md:flex items-center justify-center border-r border-primary"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
