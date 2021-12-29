import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// types
import type { Card } from "services/resources";

const pipeline = (...functions: ((cards: Card[]) => Card[])[]) => {
  return (cards: Card[]) => {
    return functions.reduce((acc, func) => func(acc), cards);
  };
};

function useFilteredCards(initialCards: Card[] = []): Card[] {
  const [searchParams] = useSearchParams();
  const paramsFromQuery = useMemo(
    () => ({
      level: searchParams.get("level") || "",
      sort: searchParams.get("sort") || "name",
      order: searchParams.get("sortorder") || "asc",
      query: searchParams.get("q") || "",
    }),
    [searchParams]
  );

  const filterByName = useCallback(
    (cards: Card[]) => {
      const { query } = paramsFromQuery;
      if (!query) return cards;

      return cards.filter((card) => {
        const cardString = JSON.stringify(card);
        return cardString.toLowerCase().includes(query.toLowerCase());
      });
    },
    [paramsFromQuery]
  );

  const filterByLevel = useCallback(
    (cards: Card[]) => {
      const { level } = paramsFromQuery;
      if (!level) return cards;

      return cards.filter((card) => {
        if (!level) return true;
        if (level === "no-level") return card.level === undefined;
        if (level) return card.level === Number(level);
        return false;
      });
    },
    [paramsFromQuery]
  );

  const sortBy = useCallback(
    (cards: Card[]) => {
      const { order, sort } = paramsFromQuery;
      cards.sort((a, b) => {
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
      return cards;
    },

    [paramsFromQuery]
  );

  const filteredCards = useMemo(() => {
    const finalCards = pipeline(
      filterByName,
      filterByLevel,
      sortBy
    )(initialCards);

    return finalCards;
  }, [initialCards, sortBy, filterByLevel, filterByName]);

  return filteredCards;
}

export default useFilteredCards;
