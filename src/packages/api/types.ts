import type { User } from "../auth/types";

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface Routes {
  auth: {
    user: {
      $get: () => Promise<ApiResponse<User>>;
    };
  };
  test: {
    $get: () => Promise<ApiResponse<{ ok: boolean }>>;
  };
}
