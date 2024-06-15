import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";

export const getJWTHeader = (userToken: string) => {
  return { Authorization: `Bearer ${userToken}` };
};

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
