import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// utils
import decksService from "services/decks";
import { useDeckContext } from "contexts/deck";
import queryClient from "../client";
import queryKeys from "../query-keys";

// types
import type { Card, Deck } from "services/resources";

function useAddCardMutation() {
  const { deckId } = useDeckContext();
  const deckIdQueryKey = queryKeys.decks.details(deckId);

  return useMutation((card: Card) => decksService.addById(deckId, card), {
    onSuccess: async ({ name }) => {
      toast(`"${name}" was added to your deck.`, { type: "success" });
    },
    onMutate: async (card) => {
      await queryClient.cancelQueries(deckIdQueryKey);
      const previousDeck = queryClient.getQueryData<Deck>(deckIdQueryKey);

      queryClient.setQueryData<Deck>(deckIdQueryKey, (oldDeck) => {
        if (!oldDeck) return oldDeck;

        return {
          ...oldDeck,
          cards: [card, ...oldDeck.cards],
        };
      });

      return { previousDeck };
    },
    onError: (error, card, context) => {
      queryClient.setQueryData(deckIdQueryKey, context?.previousDeck);
      toast(`Error adding "${card.name}" to your deck.`, { type: "error" });
    },
  });
}

export default useAddCardMutation;
