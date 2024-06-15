import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { User } from "../../../shared/types";

import { useLoginData } from "./AuthContext";
import { axiosInstance } from "../axiosInstance";
import { useUser } from "../hooks/useUser";

import { useNavigate } from "react-router-dom";

interface UseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  signout: () => void;
}

type UserResponse = { user: User };
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

export const useAuthActions = (): UseAuth => {
  const navigate = useNavigate();
  const { updateUser, clearUser } = useUser();
  const { setLoginData, clearLoginData } = useLoginData();

  const SERVER_ERROR = "There was an error contacting the server.";

  const authServerCall = async (
    urlEndpoint: string,
    email: string,
    password: string,
    name?: string
  ) => {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> =
        await axiosInstance({
          url: urlEndpoint,
          method: "POST",
          data: { email, password, name },
          headers: { "Content-Type": "application/json" },
        });

      if (status === 400) {
        const message = "message" in data ? data.message : "Unauthorized";
        toast.error(message);
        return;
      }

      if ("user" in data && !("token" in data.user)) {
        toast.success(`Hey ${data.user.name} welcome!`);
        navigate("/login");
      }

      if ("user" in data && "token" in data.user) {
        toast.success(`Logged in as ${data.user.name}`);

        updateUser(data.user);
        setLoginData({
          userId: data.user._id,
          userToken: data.user.token as string,
        });
      }
    } catch (errorResponse) {
      const title =
        axios.isAxiosError(errorResponse) &&
        errorResponse?.response?.data?.errors[0].message
          ? errorResponse?.response?.data?.errors[0].message
          : SERVER_ERROR;
      toast.error(title);
    }
  };

  async function signin(email: string, password: string): Promise<void> {
    authServerCall("/auth/signin", email, password);
  }
  async function signup(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    await authServerCall("/auth/register", email, password, name);
  }

  function signout(): void {
    clearUser();
    clearLoginData();
    toast.success("Logged out!");
  }

  return {
    signin,
    signup,
    signout,
  };
};
