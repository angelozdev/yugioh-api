import { useCallback } from "react";
import { useMutation } from "react-query";

// utils
import decksService from "services/decks";

// types
import type { Card } from "services/resources";

function useDeleteCardMutation(deckId: string) {
  const deleteCardMutation = useMutation((cardId: string) =>
    decksService.deleteCard(deckId, cardId)
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
