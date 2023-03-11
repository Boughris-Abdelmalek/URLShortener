import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import MyContext from "../lib/context";

const Home = () => {
  const { isLoggedIn } = useContext(MyContext);
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isLoggedIn]);

  return null;
};

export default Home;
