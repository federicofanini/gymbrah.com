"use server";

import { prisma } from "@/packages/database/prisma";
import {
  BusinessResponse,
  CreateBusinessInput,
  BusinessWithDetails,
} from "./types";
import { Business } from "@prisma/client";

export async function createBusiness(
  input: CreateBusinessInput
): Promise<BusinessResponse> {
  try {
    // Create the main business record using raw SQL
    const business = await prisma.$queryRaw<Business[]>`
      INSERT INTO "Business" (
        id,
        name,
        slug,
        type,
        description,
        "ownerId",
        "createdAt",
        "updatedAt"
      )
      VALUES (
        gen_random_uuid(),
        ${input.name},
        ${input.slug},
        ${input.type}::text::"BusinessType",
        ${input.description},
        ${input.ownerId},
        NOW(),
        NOW()
      )
      RETURNING *;
    `;

    const businessRecord = business[0];

    // Create profile if provided
    if (input.profile) {
      await prisma.$queryRaw`
        INSERT INTO "BusinessProfile" (
          id,
          "businessId",
          "priceRange"
        )
        VALUES (
          gen_random_uuid(),
          ${businessRecord.id},
          ${input.profile.priceRange}::text::"PriceRange"
        );
      `;
    }

    // Create location if provided
    if (input.location) {
      await prisma.$queryRaw`
        INSERT INTO "BusinessLocation" (
          id,
          "businessId",
          address,
          city,
          country,
          "zipCode",
          latitude,
          longitude
        )
        VALUES (
          gen_random_uuid(),
          ${businessRecord.id},
          ${input.location.address},
          ${input.location.city},
          ${input.location.country},
          ${input.location.zipCode},
          ${input.location.latitude},
          ${input.location.longitude}
        );
      `;
    }

    // Create contact if provided
    if (input.contact) {
      await prisma.$queryRaw`
        INSERT INTO "BusinessContact" (
          id,
          "businessId",
          email,
          phone,
          "websiteUrl"
        )
        VALUES (
          gen_random_uuid(),
          ${businessRecord.id},
          ${input.contact.email},
          ${input.contact.phone},
          ${input.contact.websiteUrl}
        );
      `;
    }

    // Create services if provided
    if (input.services?.length) {
      for (const serviceName of input.services) {
        await prisma.$queryRaw`
          INSERT INTO "ServiceTag" (
            id,
            "businessId",
            name
          )
          VALUES (
            gen_random_uuid(),
            ${businessRecord.id},
            ${serviceName}
          );
        `;
      }
    }

    // Create meta record
    await prisma.$queryRaw`
      INSERT INTO "BusinessMeta" (
        id,
        "businessId",
        "isVerified",
        "isFeatured",
        status,
        "viewCount"
      )
      VALUES (
        gen_random_uuid(),
        ${businessRecord.id},
        false,
        false,
        'PENDING',
        0
      );
    `;

    // Fetch the complete business record with all relations
    const result = await prisma.$queryRaw<BusinessWithDetails[]>`
      SELECT 
        b.*,
        bp.*,
        bl.*,
        bc.*,
        bm.*,
        array_agg(DISTINCT st.name) FILTER (WHERE st.name IS NOT NULL) as services,
        '[]'::json as amenities,
        '[]'::json as gallery
      FROM "Business" b
      LEFT JOIN "BusinessProfile" bp ON b.id = bp."businessId"
      LEFT JOIN "BusinessLocation" bl ON b.id = bl."businessId"
      LEFT JOIN "BusinessContact" bc ON b.id = bc."businessId"
      LEFT JOIN "BusinessMeta" bm ON b.id = bm."businessId"
      LEFT JOIN "ServiceTag" st ON b.id = st."businessId"
      WHERE b.id = ${businessRecord.id}
      GROUP BY b.id, bp.id, bl.id, bc.id, bm.id;
    `;

    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Error creating business:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create business",
    };
  }
}
