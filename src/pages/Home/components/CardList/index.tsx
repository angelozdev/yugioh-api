import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

// components
import { CardPlaceholder, CardItem, Search } from "../";
import { Check, Heart, Spin } from "components/icons";

// utils
import { useCardList, useDebounceState, useIntersectionObserver } from "hooks";
import { useAddCardMutation } from "./hooks";

function CardList() {
  const divRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const paramsFromQuery = {
    level: searchParams.get("level") || "",
    sort: searchParams.get("sort") || "name",
    order: searchParams.get("sortorder") || "asc",
    query: searchParams.get("q") || "",
  };
  const [debounceQuery, setQuery] = useDebounceState(
    paramsFromQuery.query,
    500
  );
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useCardList({ ...paramsFromQuery, query: debounceQuery });

  const addCardMutation = useAddCardMutation("fUCAw3WlzoN54yWQMK7M");

  useIntersectionObserver(
    divRef,
    {
      onVisible: () =>
        !isError && !isFetching && hasNextPage && fetchNextPage(),
    },
    {
      rootMargin: "500px",
      threshold: 1,
    }
  );

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams, setQuery]);

  return (
    <div className="container py-4">
      <div className="py-4 text-center">
        <Search />
      </div>
      <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
        {isSuccess &&
          data?.pages?.map((page) =>
            page.data?.map((card) => {
              const {
                archetype,
                atk,
                attribute,
                card_images,
                def,
                desc,
                name,
                type,
              } = card;
              return card_images.map(({ id }, index) => {
                const wasAdded =
                  addCardMutation.isSuccess &&
                  addCardMutation.variables?.card.id === id;

                const isLoading =
                  addCardMutation.isLoading &&
                  addCardMutation.variables?.card.id === id;

                return (
                  <CardItem
                    archetype={archetype}
                    attack={atk}
                    attribute={attribute}
                    defense={def}
                    description={desc}
                    disabled={wasAdded}
                    icon={wasAdded ? Check : Heart}
                    id={id}
                    imageIndex={index}
                    images={card_images}
                    isLoading={isLoading}
                    key={id}
                    name={name}
                    onClickIcon={addCardMutation.onAddCard}
                    type={type}
                  />
                );
              });
            })
          )}

        {isLoading &&
          Array(32)
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
    </div>
  );
}

export default CardList;
