import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import { Home } from "pages";
import { Header } from "components";
import { useIsFetching } from "react-query";

function App() {
  const isFetching = useIsFetching();
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {isFetching && (
        <p className="fixed bottom-4 right-4 inline-flex items-center gap-2 bg-white p-1 rounded-full shadow-lg">
          <span className="inline-block animate-ping w-2 h-2 bg-cyan-900 rounded-full" />
        </p>
      )}
    </Fragment>
  );
}

export default App;
