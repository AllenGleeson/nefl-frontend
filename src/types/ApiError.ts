export interface ApiError {
  code: number;
  message: string;
}

export const isApiError = (err: unknown): err is ApiError => {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    typeof (err as { code?: unknown }).code === "number" &&
    "message" in err &&
    typeof (err as { message?: unknown }).message === "string"
  );
};