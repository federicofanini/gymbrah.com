"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteBusiness } from "@/packages/database/business";

type DeleteBusinessDialogProps = {
  businessId: string;
  businessName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteBusinessDialog({
  businessId,
  businessName,
  isOpen,
  onOpenChange,
}: DeleteBusinessDialogProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteBusiness(businessId);

      if (result.success) {
        toast.success("Business deleted successfully");
        router.refresh(); // Refresh the page data
        onOpenChange(false); // Close the dialog
      } else {
        toast.error(result.error || "Failed to delete business");
      }
    } catch (error) {
      console.error("Error deleting business:", error);
      toast.error("Failed to delete business. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Business</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-bold">{businessName}</span>? This action
            cannot be undone and will permanently delete all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete Business"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
