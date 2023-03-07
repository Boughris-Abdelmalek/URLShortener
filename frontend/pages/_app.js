import "@/styles/globals.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import MyContext from "@/lib/context";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = Cookies.get("jwt");
        if (!jwt) return;
        const response = await fetch(
          `${process.envNEXT_PUBLIC_API_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (!response.ok) {
          Cookies.remove("jwt");
          setUser(null);
        } else {
          const user = await response.json();
          setUser(user);
        }
      } catch (error) {
        console.error("An error occured while fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        user: user,
        isLoggedIn: !!user,
        setUser,
        setUrls,
        urls,
      }}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </MyContext.Provider>
  );
}
