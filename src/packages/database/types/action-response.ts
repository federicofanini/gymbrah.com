/**
 * Generic response type for server actions
 */
export type ActionResponse<T = any> =
  | { success: true; data: T }
  | { success: false; error: string };
