import { Fragment } from "react";

export const routes = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/decks",
    label: (count = 0) => (
      <Fragment>
        <span>Decks</span>{" "}
        {!!count && <span className="text-sm">({count})</span>}
      </Fragment>
    ),
  },
];
