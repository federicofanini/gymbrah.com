import {
  Business,
  BusinessContact,
  BusinessLocation,
  BusinessMeta,
  BusinessProfile,
  BusinessType,
  PriceRange,
} from "@prisma/client";
import { ActionResponse } from "../types/action-response";

export type BusinessWithDetails = Business & {
  profile: BusinessProfile | null;
  location: BusinessLocation | null;
  contact: BusinessContact | null;
  meta: BusinessMeta | null;
  services: { name: string }[];
  amenities: { name: string }[];
  gallery: { url: string }[];
};

export type CreateBusinessInput = {
  name: string;
  slug: string;
  type: BusinessType;
  description: string;
  ownerId: string;
  profile?: {
    logoUrl?: string;
    coverImageUrl?: string;
    pricingDetails?: string;
    pricingFileUrl?: string;
    priceRange: PriceRange;
  };
  location?: {
    address: string;
    city: string;
    region?: string;
    country: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
  contact?: {
    email: string;
    phone?: string;
    whatsappLink?: string;
    websiteUrl?: string;
    bookingUrl?: string;
  };
  services?: string[];
  amenities?: string[];
  gallery?: string[];
};

export type UpdateBusinessInput = Partial<CreateBusinessInput> & {
  id: string;
};

export type BusinessResponse = ActionResponse<BusinessWithDetails>;
export type BusinessListResponse = ActionResponse<{
  businesses: BusinessWithDetails[];
  total: number;
}>;

export type BusinessQueryOptions = {
  page?: number;
  limit?: number;
  type?: BusinessType;
  city?: string;
  priceRange?: PriceRange;
  services?: string[];
  amenities?: string[];
  search?: string;
};
