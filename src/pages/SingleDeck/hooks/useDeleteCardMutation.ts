import { useCallback } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

// utils
import decksService from "services/decks";
import { useDeckContext } from "contexts/deck";

// types
import type { Card } from "services/resources";

function useDeleteCardMutation() {
  const { deckId } = useDeckContext();
  const deleteCardMutation = useMutation(
    (cardId: string) => decksService.deleteCard(deckId, cardId),
    {
      onSuccess: async ({ name }) =>
        toast(`"${name}" was deleted from your deck.`, { type: "success" }),
    }
  );

  const onDeleteCard = useCallback(
    (card: Partial<Card>) => {
      if (!card?.id) return;
      deleteCardMutation.mutate(String(card.id));
    },
    [deleteCardMutation]
  );

  return { ...deleteCardMutation, onDeleteCard };
}

export default useDeleteCardMutation;
