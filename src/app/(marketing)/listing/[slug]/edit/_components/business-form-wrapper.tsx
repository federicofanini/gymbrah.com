"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BusinessForm,
  businessSchema,
} from "@/components/private/business/business-form";
import { updateBusiness } from "@/packages/database/business";
import type {
  BusinessWithDetails,
  CreateBusinessInput,
  UpdateBusinessInput,
} from "@/packages/database/business";
import type { z } from "zod";

type BusinessFormWrapperProps = {
  initialData: BusinessWithDetails;
};

export function BusinessFormWrapper({ initialData }: BusinessFormWrapperProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Transform BusinessWithDetails to match form schema
  const formInitialData = {
    name: initialData.name,
    type: initialData.type,
    description: initialData.description,
    profile: {
      priceRange: initialData.profile?.priceRange || "MEDIUM",
    },
    // Only include location if all required fields are present
    ...(initialData.location
      ? {
          location: {
            address: initialData.location.address || "",
            city: initialData.location.city || "",
            country: initialData.location.country || "",
            zipCode: initialData.location.zipCode || "",
            // Only include coordinates if both are valid numbers
            ...(typeof initialData.location.latitude === "number" &&
            typeof initialData.location.longitude === "number"
              ? {
                  latitude: initialData.location.latitude,
                  longitude: initialData.location.longitude,
                }
              : undefined),
          },
        }
      : undefined),
    contact: {
      email: initialData.contact?.email || "",
      phone: initialData.contact?.phone || "",
      websiteUrl: initialData.contact?.websiteUrl || "",
    },
    services: initialData.services.map((s) => s.name),
  };

  const handleSubmit = async (data: z.infer<typeof businessSchema>) => {
    setIsLoading(true);
    try {
      // Prepare update data with proper types
      const updateData: UpdateBusinessInput = {
        id: initialData.id,
        name: data.name,
        type: data.type,
        description: data.description,
        profile: {
          priceRange: data.profile.priceRange,
        },
      };

      // Only include location if all required fields are present
      if (
        data.location.address &&
        data.location.city &&
        data.location.country &&
        data.location.zipCode
      ) {
        // Only include coordinates if both are valid numbers
        if (
          typeof data.location.latitude === "number" &&
          typeof data.location.longitude === "number"
        ) {
          updateData.location = {
            address: data.location.address,
            city: data.location.city,
            country: data.location.country,
            zipCode: data.location.zipCode,
            latitude: data.location.latitude,
            longitude: data.location.longitude,
          };
        }
      }

      // Only include contact if email is present
      if (data.contact.email) {
        updateData.contact = {
          email: data.contact.email,
          phone: data.contact.phone,
          websiteUrl: data.contact.websiteUrl,
        };
      }

      // Only include services if there are any
      if (data.services.length > 0) {
        updateData.services = data.services;
      }

      const result = await updateBusiness(updateData);

      if (result.success) {
        router.push("/listing");
      } else {
        // Handle error
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error updating business:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BusinessForm
      initialData={formInitialData as Partial<CreateBusinessInput>}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
