/**
 * Generic response type for server actions
 */
export type ActionResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };
