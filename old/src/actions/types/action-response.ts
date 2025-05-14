export interface ActionResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
