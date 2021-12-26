import { useQuery, UseQueryOptions } from "react-query";

// utils
import decksService from "services/decks";

// types
import type { Deck } from "services/resources";

function useDeckQuery(
  deckId: string,
  options?: UseQueryOptions<Deck | null, unknown, Deck, [string, object]>
) {
  const deckQuery = useQuery(
    ["deck", { id: deckId }],
    () => decksService.getById(deckId),
    { staleTime: Infinity, ...options }
  );

  return deckQuery;
}

export default useDeckQuery;
