"use client";

import { AlertCircle } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <AlertCircle className="h-16 w-16 text-destructive" />
      <h1 className="text-2xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="text-muted-foreground">
        We apologize for the inconvenience. Please try again later.
      </p>
    </div>
  );
}
