import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const createTitle = (errorMsg: string, actionType: "query" | "mutation") => {
  const action = actionType === "query" ? "fetch" : "update";
  return `could not ${action} data: ${
    errorMsg ?? "error connecting to server"
  }`;
};

let isToastShown = false;

const errorHandler = (title: string) => {
  const id = "react-query-error";
  if (!isToastShown) {
    toast.error(title, {
      id: id,
    });

    isToastShown = true;
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnMount: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      errorHandler(createTitle(error.message, "query"));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      errorHandler(createTitle(error.message, "mutation"));
    },
  }),
});
