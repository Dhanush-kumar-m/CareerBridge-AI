import { getToken } from "./auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

async function apiRequest(
  endpoint,
  options = {}
) {
  try {
    const token = getToken();

    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        headers: {
          "Content-Type":
            "application/json",
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
          ...options.headers,
        },
        ...options,
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        `HTTP Error ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error(
      "API Error:",
      error.message
    );

    throw error;
  }
}

/* GET */

export const getData = (
  endpoint
) =>
  apiRequest(endpoint, {
    method: "GET",
  });

/* POST */

export const postData = (
  endpoint,
  body
) =>
  apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });

/* PUT */

export const putData = (
  endpoint,
  body
) =>
  apiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
  });

/* DELETE */

export const deleteData = (
  endpoint
) =>
  apiRequest(endpoint, {
    method: "DELETE",
  });

export default apiRequest;