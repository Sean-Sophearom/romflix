import { useState, useContext, createContext, useEffect } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState({ token: "", username: "" });

  return <TokenContext.Provider value={{ token, setToken }}>{children}</TokenContext.Provider>;
};

export const useToken = () => useContext(TokenContext);
