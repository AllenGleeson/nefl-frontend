/**
 * API error shape for type-safe error handling (e.g. login, API calls).
 */
export type ApiError = {
  code: string | number;
  message: string;
};

export function isApiError(err: unknown): err is ApiError {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    "message" in err &&
    (typeof (err as ApiError).message === "string")
  );
}
