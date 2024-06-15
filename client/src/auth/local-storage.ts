const USER_LOCAL_STORAGE_KEY = "subscription-user";
import { LoginData } from "./types";

export const getStoredLoginData = (): LoginData | null => {
  const storedLoginData = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  try {
    return storedLoginData ? JSON.parse(storedLoginData) : null;
  } catch (err) {
    return null;
  }
};

export const setStoredLoginData = (loginData: LoginData) => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(loginData));
};

export const clearStoredLoginData = () => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
};
