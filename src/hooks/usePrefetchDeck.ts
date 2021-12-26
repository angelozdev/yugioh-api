import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

// utils
import decksService from "services/decks";
import db from "firebase-client/db";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default usePrefetchDeck;
