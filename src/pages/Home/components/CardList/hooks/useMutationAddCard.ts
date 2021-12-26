import { useCallback } from "react";
import { useMutation } from "react-query";
import decksService from "services/decks";
import { Card } from "services/resources";

function useMutationAddCard(deckId: string) {
  const addCardMutation = useMutation(
    ({ deckId, card }: { deckId: string; card: any }) =>
      decksService.addCard(deckId, card)
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

export default useMutationAddCard;
