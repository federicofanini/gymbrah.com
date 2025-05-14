export const EXERCISE_API_CONFIG = {
  baseUrl: "https://exercisedb.p.rapidapi.com",
  headers: {
    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    "x-rapidapi-key": process.env.EXERCISE_DB_API_KEY!,
  },
} as const;

// Possible values for the body part field in the exercises API
export const BODY_PARTS = {
  BACK: "back",
  CARDIO: "cardio",
  CHEST: "chest",
  LOWER_ARMS: "lower arms",
  LOWER_LEGS: "lower legs",
  NECK: "neck",
  SHOULDERS: "shoulders",
  UPPER_ARMS: "upper arms",
  UPPER_LEGS: "upper legs",
  WAIST: "waist",
} as const;

export type BodyPart = (typeof BODY_PARTS)[keyof typeof BODY_PARTS];
