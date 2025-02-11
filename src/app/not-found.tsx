import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import OutlinedButton from "@/components/ui/outlined-button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <TriangleAlert className="h-16 w-16 text-muted-foreground" />
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <OutlinedButton variant="default">
        <Link href="/">Back to home</Link>
      </OutlinedButton>
    </div>
  );
}
