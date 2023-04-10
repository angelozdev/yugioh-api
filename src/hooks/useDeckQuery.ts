import { useQuery, UseQueryOptions } from "@tanstack/react-query";

// utils
import decksService from "services/decks";
import { queryKeys } from "libs/react-query";

// types
import type { Deck } from "services/resources";

function useDeckQuery(
  deckId: string,
  options?: UseQueryOptions<Deck | null, unknown, Deck, string[]>
) {
  const deckQuery = useQuery(
    queryKeys.decks.details(deckId),
    () => decksService.getById(deckId),
    { staleTime: Infinity, enabled: !!deckId, ...options }
  );

  return deckQuery;
}

export default useDeckQuery;
