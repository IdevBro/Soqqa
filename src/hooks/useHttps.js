import { useState } from "react";
const { REACT_APP_BASE_URL: Baseurl } = process.env;

export const useHttps = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh");
    const response = await fetch(`${Baseurl}/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    } else {
      localStorage.removeItem("accessToken"); // Tokenlarni o'chirish
      localStorage.removeItem("refreshToken");
      window.location.href = "/"; // Login sahifasiga yo'naltirish
      throw new Error("Session expired, please login again");
    }
  };

  const request = async ({
    url,
    method = "GET",
    body = null,
    token = false,
  }) => {
    setLoading(true);
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;
    }

    try {
      const response = await fetch(Baseurl + url, {
        method,
        body: JSON.stringify(body),
        headers,
      });
      if (!response.ok) {
        if (response.status === 401) {
          const newToken = await refreshToken();
          return request({ url, method, body, token: newToken });
        }
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }
      setLoading(false);
      const result = await response.json();
      setData(result);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return { loading, data, error, request };
};
