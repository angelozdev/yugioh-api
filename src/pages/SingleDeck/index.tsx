import { Fragment } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

// utils
import decksService from "services/decks";

// components
import { CardItem } from "pages/Home/components";

function SingleDeck() {
  const { id: deckId } = useParams();
  if (!deckId) throw new Error("No id");
  const { isLoading, isSuccess, data } = useQuery(
    ["deck", { id: deckId }],
    () => decksService.getById(deckId)
  );

  const deleteCardMutation = useMutation((cardId: string) =>
    decksService.deleteCard(deckId, cardId)
  );

  return (
    <section className="container my-4">
      {isLoading && <p>Loading...</p>}

      {isSuccess && (
        <Fragment>
          <h1 className="text-xl">{data?.name}</h1>
          <p>{data?.description}</p>
          <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
            {data?.cards.map(
              ({ id, name, archetype, desc, card_images, atk, def, type }) => (
                <CardItem
                  key={id}
                  archetype={archetype}
                  attack={atk}
                  defense={def}
                  description={desc}
                  id={id}
                  imageIndex={
                    card_images.findIndex((image) => image.id === id) || 0
                  }
                  images={card_images}
                  name={name}
                  type={type}
                  onDeleteCard={async (id: string) =>
                    deleteCardMutation.mutate(id)
                  }
                  showSuccessIcon={
                    deleteCardMutation.isSuccess &&
                    deleteCardMutation.variables === String(id)
                  }
                  isLoading={
                    deleteCardMutation.isLoading &&
                    deleteCardMutation.variables === String(id)
                  }
                />
              )
            )}
          </ul>
        </Fragment>
      )}
    </section>
  );
}

export default SingleDeck;
