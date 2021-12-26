import { QueryClient } from "react-query";
import { toast } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        const message =
          error instanceof Error ? error.message : "Server Internal Error";
        toast(message, { type: "error" });
      },
    },
  },
});

export default queryClient;
