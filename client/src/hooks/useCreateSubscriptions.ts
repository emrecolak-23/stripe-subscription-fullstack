import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "../react-query/constants";
import { useLoginData } from "../auth/AuthContext";
import { getJWTHeader } from "../axiosInstance";

const createSubscription = async (
  priceId: string,
  userToken: string
): Promise<string> => {
  const { data } = await axiosInstance.post(
    "/create-subscription",
    {
      priceId,
    },
    {
      headers: getJWTHeader(userToken),
    }
  );
  return data;
};

export const useCreateSubscription = () => {
  const { userToken } = useLoginData();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (priceId: string) => createSubscription(priceId, userToken!),
    onSuccess: (res: string) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.subs] });
      toast.success("Subscription created");
      window.open(res, "_self");
    },
  });

  return mutate;
};
