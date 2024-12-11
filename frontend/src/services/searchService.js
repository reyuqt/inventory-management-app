import api from "./api";


export const searchItems = async (searchString) => {
  const params = new URLSearchParams();

  try {
    const response = await api.get(`/items/${searchString}`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Search failed:", error.response?.data || error.message);
    throw error;
  }
};
