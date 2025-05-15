import { prisma } from "../prisma";
import { BusinessResponse, CreateBusinessInput } from "./types";

export async function createBusiness(
  input: CreateBusinessInput
): Promise<BusinessResponse> {
  try {
    const business = await prisma.business.create({
      data: {
        name: input.name,
        slug: input.slug,
        type: input.type,
        description: input.description,
        ownerId: input.ownerId,
        profile: input.profile
          ? {
              create: input.profile,
            }
          : undefined,
        location: input.location
          ? {
              create: input.location,
            }
          : undefined,
        contact: input.contact
          ? {
              create: input.contact,
            }
          : undefined,
        meta: {
          create: {
            isVerified: false,
            isFeatured: false,
            status: "PENDING",
            viewCount: 0,
          },
        },
        services: input.services
          ? {
              create: input.services.map((name) => ({ name })),
            }
          : undefined,
        amenities: input.amenities
          ? {
              create: input.amenities.map((name) => ({ name })),
            }
          : undefined,
        gallery: input.gallery
          ? {
              create: input.gallery.map((url) => ({ url })),
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
    console.error("Error creating business:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create business",
    };
  }
}
