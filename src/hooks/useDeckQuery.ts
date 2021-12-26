import { useQuery } from "react-query";

// utils
import decksService from "services/decks";

function useDeckQuery(deckId: string) {
  const deckQuery = useQuery(
    ["deck", { id: deckId }],
    () => decksService.getById(deckId),
    { staleTime: Infinity }
  );

  return deckQuery;
}

export default useDeckQuery;
