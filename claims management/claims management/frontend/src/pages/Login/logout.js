import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();

    navigate("/", { state: { loggedOut: true } });
  }, [navigate]);

  return null;
};

export default Logout;
