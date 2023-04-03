"use client";

import { useSession } from "next-auth/react";
import useMainPage from "../lib/useMainPage";
import Spinner from "../components/Spinner";

const Home = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const { loading } = useMainPage(email);

  if (loading) {
    return <Spinner />;
  }
};

export default Home;
