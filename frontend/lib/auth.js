import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const register = async (username, email, password) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`${API_URL}/api/auth/local/register`, options);
    if (response) {
      Cookies.set("jwt", response.jwt, { sameSite: "none", secure: true });
    }
    return response;
  } catch (err) {
    return { error: `An error occured: ${err}` };
  }
};

export const login = async (email, password) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`${API_URL}/api/auth/local`, options);
    if (response) {
      Cookies.set("jwt", response.jwt, { sameSite: "none", secure: true });
    }
    return response;
  } catch (err) {
    return { error: `An error occured: ${err}` };
  }
};

export const logout = () => {
  Cookies.remove("jwt");
};
