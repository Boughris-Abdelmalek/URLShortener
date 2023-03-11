import { useContext, useEffect } from "react";
import MyContext from "@/lib/context";
import { useRouter } from "next/router";
import { get } from "@/lib/shortener";

const Dashboard = () => {
  const { user, isLoggedIn, urls, setUser, setUrls } = useContext(MyContext);

  const router = useRouter();
  const getAll = async () => {
    const short = await get();
    if (!short) return;
    setUrls(short?.data?.attributes?.results || "url");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    getAll();
  }, [urls.length]);

  return <h1>Welcome {user.username} !</h1>;
};

export default Dashboard;
