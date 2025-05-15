"use client";

import { Badge } from "@/components/ui/badge";
import { Construction } from "lucide-react";
import { SubscribeInput } from "./subscribe-input";

interface ComingSoonProps {
  title?: string;
  description?: string;
  showSubscribe?: boolean;
  members?: number;
}

export function ComingSoon({
  title = "Coming Soon",
  description = "We're working hard to bring you this feature. Stay tuned for updates!",
  showSubscribe = true,
  members,
}: ComingSoonProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <Badge
          variant="destructive"
          className="py-1.5 px-3 text-sm font-medium inline-flex items-center gap-1.5 rounded-full mx-auto"
        >
          <Construction className="h-3.5 w-3.5" />
          Under Development
        </Badge>

        <h2 className="text-3xl font-medium tracking-tighter text-primary">
          {title}
        </h2>

        <p className="text-gray-600">{description}</p>

        {showSubscribe && (
          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="text-sm text-gray-600">Get notified when we launch</p>
            <div className="flex gap-2">
              <SubscribeInput />
            </div>
          </div>
        )}
        <span className="flex items-center gap-2 justify-center text-muted-foreground">
          Join <p className="font-bold">{members}</p> members in the waitlist
        </span>
      </div>
    </div>
  );
}
