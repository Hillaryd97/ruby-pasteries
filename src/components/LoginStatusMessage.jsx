import React from "react";
import { useStateContext } from "../../context/StateContext";
import { Link } from "react-router-dom";
import AccountHome from "../pages/AccountHome";

const LoginStatusMessage = () => {
  const { checkLoggedIn } = useStateContext();

  return (
    <div>
      {checkLoggedIn() ? (
        <p></p>
      ) : (
        <Link to={'/account'}>Please Login to continue</Link>
        
      )}
    </div>
  );
};

export default LoginStatusMessage;
