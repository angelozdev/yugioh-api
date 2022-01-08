import { StrictMode, Suspense } from "react";
import { render } from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

// Providers
import DeckProvider from "./contexts/deck/Provider";

// components
import App from "./App";
import { SpinnerPage } from "components";

// utils
import queryClient from "react-query-client";

// styles
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

const $root = document.getElementById("root");

render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <DeckProvider>
          <Suspense fallback={<SpinnerPage />}>
            <App />
          </Suspense>
        </DeckProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
  $root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
