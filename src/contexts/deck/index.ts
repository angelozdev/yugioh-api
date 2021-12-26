import { createContext, useContext } from "react";

interface IDeckContext {
  deckId: string;
  setDeckId: React.Dispatch<React.SetStateAction<string>>;
}

export const DeckContext = createContext<IDeckContext | undefined>(undefined);

export const useDeckContext = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeckContext must be used within a DeckContext");
  }

  return context;
};

DeckContext.displayName = "DeckContext";
export default DeckContext;
