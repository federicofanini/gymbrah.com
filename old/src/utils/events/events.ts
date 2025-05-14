export const LogEvents = {
  // Authentication Events
  SignIn: {
    name: (fullName?: string) => `🔑 Sign In${fullName ? ` ${fullName}` : ""}`,
    channel: "auth",
  },
  SignOut: {
    name: (fullName?: string) => `👋 Sign Out${fullName ? ` ${fullName}` : ""}`,
    channel: "auth",
  },
  Registered: {
    name: (fullName?: string) => `✨ New User${fullName ? ` ${fullName}` : ""}`,
    channel: "auth",
  },
  MfaVerify: {
    name: (fullName?: string) => `🔒 MFA${fullName ? ` ${fullName}` : ""}`,
    channel: "auth",
  },

  // Profile Events
  UpdateProfile: {
    name: (fullName?: string) =>
      `👤 Edit Profile${fullName ? ` ${fullName}` : ""}`,
    channel: "profile",
  },
  UpdateHealthProfile: {
    name: (fullName?: string) =>
      `💪 Edit Health${fullName ? ` ${fullName}` : ""}`,
    channel: "profile",
  },
  UpdateUsername: {
    name: (fullName?: string) =>
      `📝 Edit Name${fullName ? ` ${fullName}` : ""}`,
    channel: "profile",
  },

  // Workout Events
  WorkoutCreated: {
    name: (fullName?: string) =>
      `🏋️ New Workout${fullName ? ` ${fullName}` : ""}`,
    channel: "workout",
  },
  WorkoutDeleted: {
    name: (fullName?: string) =>
      `🗑️ Del Workout${fullName ? ` ${fullName}` : ""}`,
    channel: "workout",
  },
  WorkoutUpdated: {
    name: (fullName?: string) =>
      `✏️ Edit Workout${fullName ? ` ${fullName}` : ""}`,
    channel: "workout",
  },
  WorkoutCompleted: {
    name: (fullName?: string) =>
      `✅ Done Workout${fullName ? ` ${fullName}` : ""}`,
    channel: "workout",
  },
  WorkoutSelected: {
    name: (fullName?: string) =>
      `👆 Pick Workout${fullName ? ` ${fullName}` : ""}`,
    channel: "workout",
  },
  ExerciseAdded: {
    name: (fullName?: string) =>
      `➕ Add Exercise${fullName ? ` ${fullName}` : ""}`,
    channel: "workout",
  },
  ExerciseRemoved: {
    name: (fullName?: string) =>
      `➖ Del Exercise${fullName ? ` ${fullName}` : ""}`,
    channel: "workout",
  },

  // Achievement Events
  AchievementUnlocked: {
    name: (fullName?: string) =>
      `🏆 Achievement${fullName ? ` ${fullName}` : ""}`,
    channel: "achievement",
  },
  DailyGoalCompleted: {
    name: (fullName?: string) =>
      `📅 Daily Goal${fullName ? ` ${fullName}` : ""}`,
    channel: "achievement",
  },
  WeeklyGoalCompleted: {
    name: (fullName?: string) =>
      `📆 Weekly Goal${fullName ? ` ${fullName}` : ""}`,
    channel: "achievement",
  },

  // Feedback Events
  SendFeedback: {
    name: (fullName?: string) => `📨 Feedback${fullName ? ` ${fullName}` : ""}`,
    channel: "feedback",
  },
  VoteFeedback: {
    name: (fullName?: string) => `👍 Vote${fullName ? ` ${fullName}` : ""}`,
    channel: "feedback",
  },

  // Support Events
  SupportTicket: {
    name: (fullName?: string) => `🎫 Support${fullName ? ` ${fullName}` : ""}`,
    channel: "support",
  },

  // Settings Events
  UpdateAppSettings: {
    name: (fullName?: string) => `⚙️ Settings${fullName ? ` ${fullName}` : ""}`,
    channel: "settings",
  },

  // Analytics Events
  PageView: {
    name: (fullName?: string) => `👀 View${fullName ? ` ${fullName}` : ""}`,
    channel: "analytics",
  },
  FeatureUsed: {
    name: (fullName?: string) => `🎯 Feature${fullName ? ` ${fullName}` : ""}`,
    channel: "analytics",
  },
};
