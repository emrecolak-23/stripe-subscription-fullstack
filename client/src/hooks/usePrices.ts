import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "../react-query/constants";
import Price from "../../../shared/types";

export const getPrices = async () => {
  const { data } = await axiosInstance.get("/prices");
  return data;
};

export const usePrices = () => {
  const fallback: Price[] = [];
  const { data = fallback, isLoading } = useQuery({
    queryKey: [queryKeys.prices],
    queryFn: getPrices,
  });

  return {
    prices: data,
    isLoading,
  };
};
