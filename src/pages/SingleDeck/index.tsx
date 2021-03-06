import { Fragment, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// components
import { CardItem, CardPlaceholder, Search } from "pages/Home/components";
import { Check, Trash } from "components/icons";

// utils
import { BackToTopButton } from "components";
import { CARDS_PER_PAGE } from "hooks/useCardList";
import { useDeckContext } from "contexts/deck";
import { useDeckQuery } from "hooks";
import { useDeleteCardMutation, useFilteredCards } from "./hooks";
import decksServices from "services/decks";

function SingleDeck() {
  const { id: deckIdFromParams } = useParams();
  const navigate = useNavigate();
  const { deckId, setDeckId } = useDeckContext();
  if (!deckIdFromParams) throw new Error("No deckIdFromParams");
  const { isLoading, isSuccess, data: deck } = useDeckQuery(deckIdFromParams);
  const { data: filteredCards } = useFilteredCards(deck?.cards);
  const deleteCardMutation = useDeleteCardMutation();

  useEffect(() => {
    !deckId &&
      decksServices
        .getById(deckIdFromParams)
        .then((data) => {
          if (!data) throw new Error("No deck");
          setDeckId(data.id);
        })
        .catch(() => {
          setDeckId("");
          navigate("/decks", { replace: true });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container my-4">
      <div className="my-4">
        <Search />
      </div>

      {isLoading && (
        <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
          {Array(CARDS_PER_PAGE)
            .fill({})
            .map((_, index) => (
              <CardPlaceholder key={index} />
            ))}
        </ul>
      )}

      {isSuccess && (
        <Fragment>
          <h1 className="text-xl font-semibold">
            {deck?.name} ({filteredCards.length || 0})
          </h1>
          <p>{deck?.description}</p>
          <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
            {filteredCards.map(
              ({ id, name, archetype, desc, card_images, atk, def, type }) => {
                const wasDeleted =
                  deleteCardMutation.isSuccess &&
                  deleteCardMutation.variables === String(id);

                const isLoading =
                  deleteCardMutation.isLoading &&
                  deleteCardMutation.variables === String(id);

                const imageIndex = card_images.findIndex(
                  (image) => image.id === id
                );

                return (
                  <CardItem
                    archetype={archetype}
                    attack={atk}
                    defense={def}
                    description={desc}
                    disabled={wasDeleted}
                    icon={wasDeleted ? Check : Trash}
                    id={id}
                    imageIndex={imageIndex > -1 ? imageIndex : 0}
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

      <BackToTopButton />
    </section>
  );
}

export default SingleDeck;
