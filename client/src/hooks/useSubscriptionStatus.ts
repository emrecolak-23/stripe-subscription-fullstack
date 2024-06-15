import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "../react-query/constants";
import { useLoginData } from "../auth/AuthContext";
import { getJWTHeader } from "../axiosInstance";

const subscriptionStatus = async (userToken: string): Promise<string> => {
  const { data } = await axiosInstance.get("/subscription-status", {
    headers: getJWTHeader(userToken),
  });
  return data;
};

export const useSubscriptionStatus = () => {
  const { userId, userToken } = useLoginData();

  const fallback: Record<
    string,
    | string
    | number
    | string[]
    | number[]
    | Record<string, string>
    | Record<string, number>
  >[] = [];

  const { data = fallback, isLoading } = useQuery({
    queryKey: [queryKeys.subsStatus, userId!, userToken!],
    queryFn: () => subscriptionStatus(userToken!),
  });

  return {
    data,
    isLoading,
  };
};
