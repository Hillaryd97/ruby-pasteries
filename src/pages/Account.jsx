import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import AccountHome from "./AccountHome";
import Login from "./Login";
import LoginRegister from "./LoginRegister";
// import { useAuth } from '@supabase/supabase-js';

const Account = () => {
  const [token, setToken] = useState(false);
  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
    console.log(sessionStorage)
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      console.log(data)
      setToken(data);
    }
  }, []);

  return (
    <div className="bg-background min-h-screen font-roboto">
      <div className="container mx-auto">
        <Nav />
        <h2 className="font-bold text-center py-3 text-3xl">My Account</h2>
        <div className="flex flex-col space-y-4">
          {token ? (
            <AccountHome token={token} />
          ) : (
            <LoginRegister setToken={setToken} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
