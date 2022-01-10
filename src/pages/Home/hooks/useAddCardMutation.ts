import { useCallback } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

// utils
import decksService from "services/decks";
import { useDeckContext } from "contexts/deck";

// types
import type { Card } from "services/resources";

function useAddCardMutation() {
  const { deckId } = useDeckContext();
  const addCardMutation = useMutation(
    ({ deckId, card }: { deckId: string; card: any }) =>
      decksService.addCard(deckId, card),
    {
      onSuccess: async ({ name }) =>
        toast(`"${name}" was added to your deck.`, { type: "success" }),
    }
  );

  const onAddCard = useCallback(
    async (card: Partial<Card> | any) => {
      Object.keys(card).forEach((key) => {
        if (typeof card[key] === "undefined") delete card[key];
      });

      addCardMutation.mutate({ deckId, card });
    },
    [addCardMutation, deckId]
  );

  return { ...addCardMutation, onAddCard };
}

export default useAddCardMutation;
