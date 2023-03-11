import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const get = async () => {
  const token = Cookie.get("jwt");

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${API_URL}/api/shorteners`, options);
    const data = await response.json();

    return data;
  } catch (error) {
    return { error: "An error occured" };
  }
};
