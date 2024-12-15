"use client";
import { useEffect } from "react";
import { useSupabase } from "../hooks";

const Home = () => {
  const supabase = useSupabase();

  useEffect(() => {
    const getUSer = async () => {
      const a = await supabase.auth.getUser();
      console.log(a, "dddddddddddddd");
    };
    getUSer();
  }, []);
  return <div>Home</div>;
};

export default Home;
