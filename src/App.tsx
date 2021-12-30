import { Route, Routes, Navigate } from "react-router-dom";
import { Fragment } from "react";
import { useIsFetching } from "react-query";
import { ToastContainer } from "react-toastify";

// pages
import { Decks, Home, SingleCard, SingleDeck } from "pages";

// components
import { Header } from "components";

// utils
import { usePrefetchDeck } from "hooks";
import { useDeckContext } from "contexts/deck";

function App() {
  usePrefetchDeck();
  const { deckId } = useDeckContext();
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
            element={deckId ? <Navigate to={`/decks/${deckId}`} /> : <Decks />}
          />
          <Route path=":id" element={<SingleDeck />} />
        </Route>
      </Routes>

      {!!isFetching && (
        <p className="fixed bottom-4 left-4 inline-flex items-center gap-2 bg-white p-1 rounded-full shadow-lg">
          <span className="inline-block animate-ping w-4 h-4 bg-cyan-900 rounded-full" />
        </p>
      )}
      <ToastContainer position="bottom-right" />
    </Fragment>
  );
}

export default App;
