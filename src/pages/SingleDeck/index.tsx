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
import { useFilteredCards } from "./hooks";
import decksServices from "services/decks";
import { mutations } from "libs/react-query/hooks";

function SingleDeck() {
  const { id: deckIdFromParams } = useParams();
  if (!deckIdFromParams) throw new Error("No deckIdFromParams");

  const navigate = useNavigate();
  const { deckId, setDeckId, ids } = useDeckContext();
  const { isLoading, isSuccess, data: deck } = useDeckQuery(deckIdFromParams);
  const { data: filteredCards } = useFilteredCards(deck?.cards);
  const { isSuccess: isDeleteSuccess, mutate: deleteCard } =
    mutations.useDeleteCard();

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
        <Search localStorageKey="singleDeckSearchParams" />
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
                return (
                  <CardItem
                    archetype={archetype}
                    attack={atk}
                    defense={def}
                    description={desc}
                    disabled={!ids.has(id)}
                    icon={!ids.has(id) ? Check : Trash}
                    id={id}
                    images={card_images}
                    key={id}
                    name={name}
                    onClickIcon={() => deleteCard(String(id))}
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
