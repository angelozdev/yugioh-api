import { PropsWithChildren, useMemo, useState } from "react";

// utils
import { DeckContext } from "./";

function Provider({ children }: PropsWithChildren<{}>) {
  const [deckId, setDeckId] = useState("");

  const value = useMemo(() => ({ deckId, setDeckId }), [deckId, setDeckId]);
  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
}

export default Provider;
