import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import MyContext from "../lib/context";

const Home = () => {
  const { isLoggedIn, user } = useContext(MyContext);
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      return router.push("/dashboard");
    }
    return router.push("/login");
  }, [isLoggedIn]);

  return null;
};

export default Home;
