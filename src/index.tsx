import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";

import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Providers
import DeckProvider from "./contexts/deck/Provider";

// components
import App from "./App";
import { Spinner } from "components";
import { QueryProvider } from "libs/react-query";

const $rootElement = document.getElementById("root");

if (!$rootElement) throw new Error("No root element");
const root = createRoot($rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <DeckProvider>
          <Suspense fallback={<Spinner />}>
            <App />
          </Suspense>
        </DeckProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);
