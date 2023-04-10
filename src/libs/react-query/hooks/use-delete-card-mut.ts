import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// utils
import decksService from "services/decks";
import { useDeckContext } from "contexts/deck";
import queryKeys from "../query-keys";
import queryClient from "../client";

// types
import { Deck } from "services/resources";

function useDeleteCardMutation() {
  const { deckId } = useDeckContext();
  const deckIdQueryKey = queryKeys.decks.details(deckId);

  return useMutation(
    (cardId: string) => decksService.deleteById(deckId, cardId),
    {
      onSuccess: async ({ name }) => {
        toast(`"${name}" was deleted from your deck.`, { type: "success" });
      },
      onMutate: async (cardId) => {
        await queryClient.cancelQueries(deckIdQueryKey);
        const previousDeck = queryClient.getQueryData<Deck>(deckIdQueryKey);

        queryClient.setQueryData<Deck>(deckIdQueryKey, (oldDeck) => {
          if (!oldDeck) return oldDeck;

          return {
            ...oldDeck,
            cards: oldDeck.cards.filter((card) => String(card.id) !== cardId),
          };
        });

        return { previousDeck };
      },
      onError: (error, cardId, context) => {
        queryClient.setQueryData(deckIdQueryKey, context?.previousDeck);
        toast(`Error deleting card from your deck.`, { type: "error" });
      },
    }
  );
}

export default useDeleteCardMutation;
