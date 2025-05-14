import { HttpStatusCode } from "../constants";

export const isHttpStatus = (status: number): status is HttpStatusCode =>
  Object.values<number>(HttpStatusCode).includes(status);

interface HttpExceptionOptions {
  message?: string;
  code?: string;
}

export class HttpException extends Error {
  readonly status?: HttpStatusCode;
  readonly code?: string;

  constructor(status?: HttpStatusCode, options?: HttpExceptionOptions) {
    super(options?.message);
    this.status = status;
    this.code = options?.code;
  }
}

export const getStatusCode = (e: unknown) => {
  if (typeof e === "object" && e && "status" in e) {
    return Number(e.status);
  }

  return HttpStatusCode.INTERNAL_SERVER_ERROR;
};
