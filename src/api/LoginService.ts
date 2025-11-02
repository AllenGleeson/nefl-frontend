import { API_ENDPOINTS, apiRequest } from './config';

export async function loginUser(email: string, password: string) {
  // Use the new API structure for backward compatibility
  return apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }, false);
}
