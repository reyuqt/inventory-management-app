import api from "./api";

export const login = async (username, password) => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", username);
  params.append("password", password);
  params.append("scope", "");
  params.append("client_id", "string");
  params.append("client_secret", "string");

  try {
    const response = await api.post("/auth/login", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};
