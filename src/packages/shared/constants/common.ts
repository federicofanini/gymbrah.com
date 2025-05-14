export const NodeEnv = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  TEST: "test",
} as const;

export const SortOrder = {
  ASCENDING: "asc",
  DESCENDING: "desc",
} as const;

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
