import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

import { ROLE, TOKEN } from "../constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(Boolean(Cookies.get(TOKEN)));
  const [role, setRole] = useState(localStorage.getItem(ROLE));

  const state = { isLogin, role, setIsLogin, setRole };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
