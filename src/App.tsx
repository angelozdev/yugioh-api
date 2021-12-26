import { Route, Routes, Navigate } from "react-router-dom";
import { Fragment } from "react";
import { Home, SingleCard, SingleDeck } from "pages";
import { Header } from "components";
import { useIsFetching } from "react-query";
import { usePrefetchDeck } from "hooks";
import { ToastContainer } from "react-toastify";

function App() {
  usePrefetchDeck("fUCAw3WlzoN54yWQMK7M");
  const isFetching = useIsFetching();
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Routes>
        <Route path="/cards">
          <Route path="" element={<Navigate to="/" />} />
          <Route path=":id" element={<SingleCard />} />
        </Route>
      </Routes>

      <Routes>
        <Route path="/decks">
          <Route
            path=""
            element={<Navigate to="/decks/fUCAw3WlzoN54yWQMK7M" />}
          />
          <Route path=":id" element={<SingleDeck />} />
        </Route>
      </Routes>

      {!!isFetching && (
        <p className="fixed bottom-4 right-4 inline-flex items-center gap-2 bg-white p-1 rounded-full shadow-lg">
          <span className="inline-block animate-ping w-4 h-4 bg-cyan-900 rounded-full" />
        </p>
      )}
      <ToastContainer position="bottom-right" />
    </Fragment>
  );
}

export default App;
