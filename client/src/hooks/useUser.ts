import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import type { User } from "../../../shared/types";

import { useLoginData } from "../auth/AuthContext";

import { axiosInstance, getJWTHeader } from "../axiosInstance";
import { generateUserKey } from "../react-query/key-factories";

export const getUser = async (userId: string, userToken: string) => {
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/auth/me`,
    {
      headers: getJWTHeader(userToken),
    }
  );

  return data.user;
};

export const useUser = () => {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { data: user } = useQuery({
    queryKey: generateUserKey(userId!, userToken!),
    queryFn: () => getUser(userId!, userToken!),
    enabled: !!userId,
    staleTime: Infinity,
  });

  const updateUser = (newUser: User) => {
    queryClient.setQueryData(generateUserKey(userId!, userToken!), newUser);
  };

  const clearUser = () => {
    queryClient.removeQueries({
      queryKey: generateUserKey(userId!, userToken!),
    });
  };

  return { user, updateUser, clearUser };
};
