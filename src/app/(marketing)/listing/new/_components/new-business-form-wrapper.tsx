"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BusinessForm } from "@/components/private/business/business-form";
import { createBusiness } from "@/packages/database/business";
import { slugify } from "@/lib/utils";
import type { z } from "zod";
import type { businessSchema } from "@/components/private/business/business-form";
import type { CreateBusinessInput } from "@/packages/database/business";
import { toast } from "sonner";

type NewBusinessFormWrapperProps = {
  userId: string;
};

export function NewBusinessFormWrapper({
  userId,
}: NewBusinessFormWrapperProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: z.infer<typeof businessSchema>) => {
    setIsLoading(true);
    try {
      console.log("Form data received:", data); // Debug log

      // Prepare the business data
      const businessData: CreateBusinessInput = {
        name: data.name,
        slug: slugify(data.name),
        type: data.type,
        description: data.description,
        ownerId: userId,
        profile: data.profile,
        contact: data.contact,
        services: data.services,
      };

      // Only include location if all required fields are present
      if (
        data.location.address &&
        data.location.city &&
        data.location.country &&
        data.location.zipCode &&
        typeof data.location.latitude === "number" &&
        typeof data.location.longitude === "number"
      ) {
        businessData.location = {
          address: data.location.address,
          city: data.location.city,
          country: data.location.country,
          zipCode: data.location.zipCode,
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        };
      }

      console.log("Sending business data:", businessData); // Debug log

      const result = await createBusiness(businessData);

      if (result.success) {
        toast.success("Business created successfully!");
        router.push("/listing");
        router.refresh(); // Refresh the page data
      } else {
        toast.error(result.error || "Failed to create business");
        console.error("Error from API:", result.error);
      }
    } catch (error) {
      console.error("Error creating business:", error);
      toast.error("Failed to create business. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return <BusinessForm onSubmit={handleSubmit} isLoading={isLoading} />;
}
