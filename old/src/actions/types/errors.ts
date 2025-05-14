export const appErrors = {
  UNAUTHORIZED: "You must be logged in to perform this action",
  DATABASE_ERROR: "An error occurred while updating the database",
  UNEXPECTED_ERROR: "An unexpected error occurred",
  VALIDATION_ERROR: "Invalid input data",
  NOT_FOUND: "Resource not found",
} as const;

export type AppError = (typeof appErrors)[keyof typeof appErrors];
