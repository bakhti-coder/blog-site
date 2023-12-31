import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

import { ROLE, TOKEN } from "../constants";
import { Modal } from "antd";
import request from "../server";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(Boolean(Cookies.get(TOKEN)));
  const [role, setRole] = useState(localStorage.getItem(ROLE));
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      setLoading(true);
      let { data } = await request.get("auth/me");
      setUser(data);
    } finally {
      setLoading(false);
    }
  };

  const logOut = (navigate) => {
    Modal.confirm({
      title: "Do you want to exit?",
      onOk: () => {
        navigate("/login");
        setIsLogin(false);
        localStorage.removeItem(TOKEN);
      },
    });
  };

  useEffect(() => {
    isLogin && getUser();
  }, [isLogin]);

  const state = {
    isLogin,
    role,
    loading,
    user,
    setIsLogin,
    setRole,
    getUser,
    logOut,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
