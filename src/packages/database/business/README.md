# Business Database Actions

This module provides a set of database actions for managing businesses in the GymBrah platform. These actions handle the CRUD operations for gyms, personal trainers, and fitness studios.

## Table of Contents

- [Types](#types)
- [Create Operations](#create-operations)
- [Read Operations](#read-operations)
- [Update Operations](#update-operations)
- [Delete Operations](#delete-operations)

## Types

### Business Types

```typescript
type BusinessWithDetails = Business & {
  profile: BusinessProfile | null;
  location: BusinessLocation | null;
  contact: BusinessContact | null;
  meta: BusinessMeta | null;
  services: { name: string }[];
  amenities: { name: string }[];
  gallery: { url: string }[];
};

enum BusinessType {
  GYM
  PERSONAL_TRAINER
  STUDIO
}

enum PriceRange {
  LOW
  MEDIUM
  HIGH
}
```

### Input Types

```typescript
type CreateBusinessInput = {
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

type UpdateBusinessInput = Partial<CreateBusinessInput> & {
  id: string;
};
```

## Create Operations

### `createBusiness`

Creates a new business with all its related data.

```typescript
import { createBusiness } from "@/packages/database/business";

// Example usage
const result = await createBusiness({
  name: "Elite Fitness",
  slug: "elite-fitness",
  type: "GYM",
  description: "Premium fitness facility",
  ownerId: "user_id",
  profile: {
    priceRange: "MEDIUM",
  },
  location: {
    address: "123 Fitness St",
    city: "New York",
    country: "USA",
    zipCode: "10001",
    latitude: 40.7128,
    longitude: -74.006,
  },
  services: ["Personal Training", "Group Classes"],
  amenities: ["Parking", "Showers"],
});

if (result.success) {
  const business = result.data;
  // Handle success
} else {
  const error = result.error;
  // Handle error
}
```

## Read Operations

### `getBusinessById`

Retrieves a business by its ID.

```typescript
const business = await getBusinessById("business_id");
```

### `getBusinessBySlug`

Retrieves a business by its slug.

```typescript
const business = await getBusinessBySlug("elite-fitness");
```

### `getBusinesses`

Retrieves a list of businesses with filtering and pagination.

```typescript
const result = await getBusinesses({
  page: 1,
  limit: 10,
  type: "GYM",
  city: "New York",
  priceRange: "MEDIUM",
  services: ["Personal Training"],
  amenities: ["Parking"],
  search: "fitness",
});
```

### `getBusinessesByOwner`

Retrieves all businesses owned by a specific user.

```typescript
const result = await getBusinessesByOwner("owner_id");
```

## Update Operations

### `updateBusiness`

Updates an existing business and its related data.

```typescript
const result = await updateBusiness({
  id: "business_id",
  name: "Elite Fitness Pro",
  profile: {
    priceRange: "HIGH",
  },
  services: ["Personal Training", "Group Classes", "Nutrition Coaching"],
});
```

Key features:

- Uses `upsert` for related records (profile, location, contact)
- Replaces arrays (services, amenities, gallery) entirely
- Partial updates supported - only specify fields to update

## Delete Operations

### `deleteBusiness`

Deletes a business and all its related data.

```typescript
const result = await deleteBusiness("business_id");
```

Key features:

- Uses transactions for data consistency
- Deletes all related records (profile, location, contact, meta, services, amenities, gallery)
- Returns the deleted business data

## Response Format

All operations return a consistent response format:

```typescript
type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

## Error Handling

All operations include:

- Type checking
- Error catching
- Descriptive error messages
- Console logging for debugging
- Safe error responses

## Performance Considerations

- Uses efficient database queries
- Implements proper relations
- Supports pagination
- Uses transactions where necessary
- Includes only required fields in responses

## Best Practices

1. Always check the `success` property of the response before accessing data
2. Use proper types for input data
3. Handle errors appropriately
4. Use pagination for large datasets
5. Include only necessary fields in queries
6. Use transactions for complex operations

## Examples

### Creating a New Gym

```typescript
const newGym = await createBusiness({
  name: "PowerFit Gym",
  slug: "powerfit-gym",
  type: "GYM",
  description: "State-of-the-art fitness facility",
  ownerId: "user_123",
  profile: {
    priceRange: "MEDIUM",
    logoUrl: "https://example.com/logo.png",
  },
  location: {
    address: "456 Gym Street",
    city: "Los Angeles",
    country: "USA",
    zipCode: "90001",
    latitude: 34.0522,
    longitude: -118.2437,
  },
  services: ["Weight Training", "Cardio", "CrossFit"],
  amenities: ["Parking", "Lockers", "Showers"],
});
```

### Updating Business Hours

```typescript
const updated = await updateBusiness({
  id: "business_123",
  contact: {
    email: "info@powerfit.com",
    phone: "+1234567890",
    websiteUrl: "https://powerfit.com",
  },
});
```
