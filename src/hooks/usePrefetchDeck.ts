import db from "firebase-client/db";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import decksService from "services/decks";

function usePrefetchDeck(deckId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const deckRef = doc(db, "decks", deckId);
    const cardsRef = collection(deckRef, "cards");

    const unsubscribe = onSnapshot(cardsRef, () => {
      queryClient.prefetchQuery(["deck", { id: deckId }], () =>
        decksService.getById(deckId)
      );
    });

    return () => unsubscribe();
  }, []);
}

export default usePrefetchDeck;
