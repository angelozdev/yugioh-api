import { Fragment } from "react";
import { useParams } from "react-router-dom";

// components
import { CardItem, CardPlaceholder } from "pages/Home/components";
import { Check, Trash } from "components/icons";

// utils
import { useDeleteCardMutation } from "./hooks";
import { useDeckQuery } from "hooks";

function SingleDeck() {
  const { id: deckId } = useParams();
  if (!deckId) throw new Error("No id");

  const { isLoading, isSuccess, data } = useDeckQuery(deckId);
  const deleteCardMutation = useDeleteCardMutation(deckId);

  return (
    <section className="container my-4">
      {isLoading && (
        <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
          {Array(32)
            .fill({})
            .map((_, index) => (
              <CardPlaceholder key={index} />
            ))}
        </ul>
      )}

      {isSuccess && (
        <Fragment>
          <h1 className="text-xl font-semibold">
            {data?.name} ({data?.cards.length || 0})
          </h1>
          <p>{data?.description}</p>
          <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
            {data?.cards.map(
              ({ id, name, archetype, desc, card_images, atk, def, type }) => {
                const wasDeleted =
                  deleteCardMutation.isSuccess &&
                  deleteCardMutation.variables === String(id);

                const isLoading =
                  deleteCardMutation.isLoading &&
                  deleteCardMutation.variables === String(id);

                const imageIndex =
                  card_images.findIndex((image) => image.id === id) || 0;

                return (
                  <CardItem
                    archetype={archetype}
                    attack={atk}
                    defense={def}
                    description={desc}
                    disabled={wasDeleted}
                    icon={wasDeleted ? Check : Trash}
                    id={id}
                    imageIndex={imageIndex}
                    images={card_images}
                    isLoading={isLoading}
                    key={id}
                    name={name}
                    onClickIcon={deleteCardMutation.onDeleteCard}
                    type={type}
                  />
                );
              }
            )}
          </ul>
        </Fragment>
      )}
    </section>
  );
}

export default SingleDeck;
