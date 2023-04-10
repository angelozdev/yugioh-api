import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const onError = (error: unknown) => {
  console.log(error);

  const message =
    error instanceof Error ? error.message : "Server Internal Error";
  toast(message, { type: "error" });
};

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError,
    },
    queries: {
      onError,
    },
  },
});

export default queryClient;
