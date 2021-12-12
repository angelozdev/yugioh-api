import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import { Home } from "pages";
import { Header } from "components";

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Fragment>
  );
}

export default App;
