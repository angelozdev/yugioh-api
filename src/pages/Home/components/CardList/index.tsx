import { useEffect, useMemo, useRef } from "react";

// components
import { CardPlaceholder, CardItem, Search } from "../";
import { Check, Heart, Spin } from "components/icons";

// utils
import {
  useCardList,
  useDebounceState,
  useIntersectionObserver,
  useQueryParams,
} from "hooks";
import { useDeckContext } from "contexts/deck";
import { CARDS_PER_PAGE } from "hooks/useCardList";
import { BackToTopButton } from "components";
import { mutations } from "libs/react-query/hooks";
import { Card } from "services/resources";
import Adapter from "utils/adapter";

function CardList() {
  const { ids } = useDeckContext();
  const divRef = useRef<HTMLDivElement>(null);
  const paramsFromQuery = useQueryParams();
  const [debounceQuery, setQuery] = useDebounceState(paramsFromQuery.q, 500);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isSuccess,
    isFetchingNextPage,
  } = useCardList({ ...paramsFromQuery, query: debounceQuery });

  const flattedCardList = useMemo(() => {
    const cardList =
      data?.pages?.reduce((acc, curr) => {
        const { data } = curr;
        data.forEach((card) => {
          card.card_images.forEach((image) => {
            acc.push({ ...card, id: image.id, card_images: [image] });
          });
        });

        return acc;
      }, [] as Card[]) ?? [];

    const { all } = new Adapter(cardList, ({ id }) => String(id));
    return all;
  }, [data]);

  const { mutate: addCard } = mutations.useAddCard();

  useIntersectionObserver(
    divRef,
    {
      onVisible: () => !isFetchingNextPage && hasNextPage && fetchNextPage(),
    },
    {
      rootMargin: "500px",
      threshold: 1,
    }
  );

  useEffect(() => {
    setQuery(paramsFromQuery.q || "");
  }, [paramsFromQuery.q, setQuery]);

  return (
    <div className="container py-4">
      <div className="py-4 text-center">
        <Search localStorageKey="cardListSearchParams" />
      </div>
      <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
        {isSuccess &&
          flattedCardList.map((card) => {
            const {
              archetype,
              atk,
              attribute,
              card_images,
              def,
              desc,
              name,
              type,
              level,
              id,
            } = card;
            return (
              <CardItem
                archetype={archetype}
                attack={atk}
                attribute={attribute}
                defense={def}
                description={desc}
                disabled={ids.has(id)}
                icon={ids.has(id) ? Check : Heart}
                id={id}
                images={card_images}
                key={id}
                level={level}
                name={name}
                onClickIcon={() => addCard({ ...card, id: String(id) })}
                type={type}
              />
            );
          })}

        {isLoading &&
          Array(CARDS_PER_PAGE)
            .fill(null)
            .map((_, index) => <CardPlaceholder key={index} />)}
      </ul>

      <div className="flex justify-center mt-4 mb-32">
        <div
          ref={divRef}
          className="px-4 py-2 text-gray-400 rounded-sm inline-flex items-center shadow-sm"
        >
          {hasNextPage ? isFetching && <Spin /> : "No more for now"}
        </div>
      </div>

      <BackToTopButton />
    </div>
  );
}

export default CardList;
