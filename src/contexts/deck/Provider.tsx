import { useDeckQuery } from "hooks";
import { PropsWithChildren, useMemo, useState } from "react";

// utils
import { DeckContext } from "./";

function Provider({ children }: PropsWithChildren<{}>) {
  const [deckId, setDeckId] = useState("");
  const { data } = useDeckQuery(deckId, { enabled: false });

  const ids = useMemo(
    () => new Set(data?.cards.map((card) => card.id)),
    [data?.cards]
  );
  const value = useMemo(
    () => ({ deckId, setDeckId, ids }),
    [deckId, setDeckId, ids]
  );

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
}

export default Provider;
