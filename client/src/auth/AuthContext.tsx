import { createContext, useContext, useState } from "react";
import {
  clearStoredLoginData,
  getStoredLoginData,
  setStoredLoginData,
} from "./local-storage";
import { LoginData } from "./types";

type AuthContextValue = {
  userId: string | null;
  userToken: string | null;
  setLoginData: (loginData: LoginData) => void;
  clearLoginData: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const useLoginData = () => {
  const authValue = useContext(AuthContext);
  if (!authValue) {
    throw new Error("useLoginData must be used within AuthProvider");
  }
  return authValue;
};

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<object>) => {
  const storedLoginData = getStoredLoginData();
  const [loginData, setLoginData] = useState<LoginData | null>(storedLoginData);

  const contextValue: AuthContextValue = {
    userId: loginData?.userId || null,
    userToken: loginData?.userToken || null,
    setLoginData: (newLoginData) => {
      setLoginData(newLoginData);
      setStoredLoginData(newLoginData);
    },
    clearLoginData: () => {
      setLoginData(null);
      clearStoredLoginData();
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
