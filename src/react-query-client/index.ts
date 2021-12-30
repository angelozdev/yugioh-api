import { QueryClient } from "react-query";
import { toast } from "react-toastify";

const onError = (error: unknown) => {
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
