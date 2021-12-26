import { useEffect } from "react";
import { useQuery } from "react-query";
import { collection, doc, onSnapshot } from "firebase/firestore";

// utils
import db from "firebase-client/db";
import decksService from "services/decks";

function useDeckQuery(deckId: string) {
  const deckQuery = useQuery(
    ["deck", { id: deckId }],
    () => decksService.getById(deckId),
    { staleTime: Infinity }
  );

  useEffect(() => {
    const deckRef = doc(db, "decks", deckId);
    const cardsRef = collection(deckRef, "cards");

    const unsubscribe = onSnapshot(cardsRef, () => {
      console.log("change!");
      deckQuery.refetch();
    });

    return () => unsubscribe();
  }, []);
  return deckQuery;
}

export default useDeckQuery;
