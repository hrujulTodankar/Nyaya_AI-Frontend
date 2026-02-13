import { BASE_URL } from "../lib/apiConfig";

export async function apiRequest(
  endpoint,
  method = "GET",
  body = null
) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Backend Error:", error);
    throw error;
  }
}
