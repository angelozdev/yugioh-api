import { Fragment, useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

// components
import { CardItem, CardPlaceholder, Search } from "pages/Home/components";
import { Check, Trash } from "components/icons";

// utils
import { useDeleteCardMutation } from "./hooks";
import { useDeckQuery } from "hooks";
import { useDeckContext } from "contexts/deck";
import { Card } from "services/resources";

function SingleDeck() {
  const [searchParams] = useSearchParams();
  const { deckId } = useDeckContext();

  const { isLoading, isSuccess, data: deck } = useDeckQuery(deckId);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const deleteCardMutation = useDeleteCardMutation();

  useEffect(() => {
    const paramsFromQuery = {
      level: searchParams.get("level") || "",
      sort: searchParams.get("sort") || "name",
      order: searchParams.get("sortorder") || "asc",
      query: searchParams.get("q") || "",
    };

    console.log({ paramsFromQuery });

    let cards = deck?.cards || [];

    cards = cards.filter((card) => {
      if (!paramsFromQuery.level) return true;
      if (paramsFromQuery.level === "no-level") return card.level === undefined;
      if (paramsFromQuery.level)
        return card.level === Number(paramsFromQuery.level);
      return false;
    });

    cards.sort((a, b) => {
      const { sort, order } = paramsFromQuery;
      const isAsc = order === "asc";
      if (sort === "name") {
        return a.name.localeCompare(b.name) * (isAsc ? 1 : -1);
      }

      if (sort === "level") {
        if (!a.level) return 1;
        if (!b.level) return -1;
        if (isAsc) return a.level - b.level;
        return b.level - a.level;
      }

      if (sort === "atk") {
        if (a.atk === undefined) return 1;
        if (b.atk === undefined) return -1;
        if (isAsc) return a.atk - b.atk;
        return b.atk - a.atk;
      }

      if (sort === "def") {
        if (a.def === undefined) return 1;
        if (b.def === undefined) return -1;
        if (isAsc) return a.def - b.def;
        return b.def - a.def;
      }

      if (sort === "type") {
        return a.type.localeCompare(b.type) * (isAsc ? 1 : -1);
      }

      if (sort === "id") {
        return (
          a.id.toString().localeCompare(b.id.toString()) * (isAsc ? 1 : -1)
        );
      }

      return a.name.localeCompare(b.name) * (isAsc ? 1 : -1);
    });

    setFilteredCards(cards || []);
  }, [deck?.cards, searchParams]);

  if (!deckId) return <Navigate to="/decks" replace />;
  return (
    <section className="container my-4">
      <div>
        <Search />
      </div>

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
