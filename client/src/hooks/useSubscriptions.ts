import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "../react-query/constants";
import { useLoginData } from "../auth/AuthContext";
import { getJWTHeader } from "../axiosInstance";

const subscriptions = async (userToken: string): Promise<string> => {
  const { data } = await axiosInstance.get("/subscriptions", {
    headers: getJWTHeader(userToken),
  });
  return data;
};

export const useSubscriptions = () => {
  const { userId, userToken } = useLoginData();

  const fallback: any = [];

  const { data = fallback, isLoading } = useQuery({
    queryKey: [queryKeys.subs, userId!, userToken!],
    queryFn: () => subscriptions(userToken!),
  });

  return {
    data,
    isLoading,
  };
};
