"use server";

import { prisma } from "@/packages/database/prisma";
import { BusinessResponse, UpdateBusinessInput } from "./types";

export async function updateBusiness(
  input: UpdateBusinessInput
): Promise<BusinessResponse> {
  try {
    const { id, ...data } = input;

    const business = await prisma.business.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type,
        description: data.description,
        profile: data.profile
          ? {
              upsert: {
                create: data.profile,
                update: data.profile,
              },
            }
          : undefined,
        location: data.location
          ? {
              upsert: {
                create: data.location,
                update: data.location,
              },
            }
          : undefined,
        contact: data.contact
          ? {
              upsert: {
                create: data.contact,
                update: data.contact,
              },
            }
          : undefined,
        services: data.services
          ? {
              deleteMany: {},
              create: data.services.map((name) => ({ name })),
            }
          : undefined,
        amenities: data.amenities
          ? {
              deleteMany: {},
              create: data.amenities.map((name) => ({ name })),
            }
          : undefined,
        gallery: data.gallery
          ? {
              deleteMany: {},
              create: data.gallery.map((url) => ({ url })),
            }
          : undefined,
      },
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

    return { success: true, data: business };
  } catch (error) {
    console.error("Error updating business:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update business",
    };
  }
}
