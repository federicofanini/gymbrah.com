"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/packages/database/prisma";
import {
  BusinessListResponse,
  BusinessQueryOptions,
  BusinessResponse,
} from "./types";

const businessInclude = {
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
} as const;

export async function getBusinessById(id: string): Promise<BusinessResponse> {
  try {
    const business = await prisma.business.findUnique({
      where: { id },
      include: businessInclude,
    });

    if (!business) {
      return { success: false, error: "Business not found" };
    }

    return { success: true, data: business };
  } catch (error) {
    console.error("Error getting business:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get business",
    };
  }
}

export async function getBusinessBySlug(
  slug: string
): Promise<BusinessResponse> {
  try {
    const business = await prisma.business.findUnique({
      where: { slug },
      include: businessInclude,
    });

    if (!business) {
      return { success: false, error: "Business not found" };
    }

    return { success: true, data: business };
  } catch (error) {
    console.error("Error getting business:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get business",
    };
  }
}

export async function getBusinesses(
  options: BusinessQueryOptions = {}
): Promise<BusinessListResponse> {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      city,
      priceRange,
      services,
      amenities,
      search,
    } = options;

    const where: Prisma.BusinessWhereInput = {
      AND: [
        type ? { type } : {},
        city ? { location: { city } } : {},
        priceRange ? { profile: { priceRange } } : {},
        services?.length
          ? { services: { some: { name: { in: services } } } }
          : {},
        amenities?.length
          ? { amenities: { some: { name: { in: amenities } } } }
          : {},
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    };

    const [businesses, total] = await Promise.all([
      prisma.business.findMany({
        where,
        include: businessInclude,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.business.count({ where }),
    ]);

    return {
      success: true,
      data: { businesses, total },
    };
  } catch (error) {
    console.error("Error getting businesses:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get businesses",
    };
  }
}

export async function getBusinessesByOwner(
  ownerId: string
): Promise<BusinessListResponse> {
  try {
    const [businesses, total] = await Promise.all([
      prisma.business.findMany({
        where: { ownerId },
        include: businessInclude,
        orderBy: { createdAt: "desc" },
      }),
      prisma.business.count({ where: { ownerId } }),
    ]);

    return {
      success: true,
      data: { businesses, total },
    };
  } catch (error) {
    console.error("Error getting owner businesses:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to get owner businesses",
    };
  }
}
