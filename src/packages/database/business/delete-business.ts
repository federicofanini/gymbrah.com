"use server";

import { prisma } from "@/packages/database/prisma";
import { BusinessResponse } from "./types";

export async function deleteBusiness(id: string): Promise<BusinessResponse> {
  try {
    // First check if the business exists
    const existingBusiness = await prisma.business.findUnique({
      where: { id },
      include: {
        profile: true,
        location: true,
        contact: true,
        meta: true,
        services: true,
        amenities: true,
        gallery: true,
      },
    });

    if (!existingBusiness) {
      return { success: false, error: "Business not found" };
    }

    // Delete the business and all related records in a transaction
    const business = await prisma.$transaction(async (tx) => {
      // Delete all related records first
      await Promise.all([
        tx.businessProfile.deleteMany({ where: { businessId: id } }),
        tx.businessLocation.deleteMany({ where: { businessId: id } }),
        tx.businessContact.deleteMany({ where: { businessId: id } }),
        tx.businessMeta.deleteMany({ where: { businessId: id } }),
        tx.serviceTag.deleteMany({ where: { businessId: id } }),
        tx.amenityTag.deleteMany({ where: { businessId: id } }),
        tx.media.deleteMany({ where: { businessId: id } }),
      ]);

      // Finally delete the business
      return tx.business.delete({
        where: { id },
        include: {
          profile: true,
          location: true,
          contact: true,
          meta: true,
          services: {
            select: { name: true },
          },
          amenities: {
            select: { name: true },
          },
          gallery: {
            select: { url: true },
          },
        },
      });
    });

    return { success: true, data: business };
  } catch (error) {
    console.error("Error deleting business:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete business",
    };
  }
}
