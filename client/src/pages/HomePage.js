import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"HomePage - Ticket Sysytem"}>
      <h1 >
        HomePage
        <br />
        <h4>On top-right side click on Username to go in Dashboard</h4>
      </h1>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </Layout>
  );
};

export default HomePage;
