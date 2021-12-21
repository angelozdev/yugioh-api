import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { CardPlaceholder, CardItem, Search } from "../";
import { useCardList, useDebounceState, useIntersectionObserver } from "hooks";

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

  useIntersectionObserver(
    divRef,
    { onVisible: () => !isError && !isFetching && fetchNextPage() },
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
      <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
        {isSuccess &&
          data?.pages?.map((page) =>
            page.data?.map(
              ({
                archetype,
                atk,
                attribute,
                card_images,
                def,
                desc,
                id,
                name,
                type,
              }) => (
                <CardItem
                  archetype={archetype}
                  attack={atk}
                  attribute={attribute}
                  defense={def}
                  description={desc}
                  id={id}
                  images={card_images}
                  key={id}
                  name={name}
                  type={type}
                />
              )
            )
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
          {hasNextPage
            ? isFetching && (
                <svg
                  className="animate-spin mr-2 h-8 w-8 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx={12}
                    cy={12}
                    r={10}
                    stroke="currentColor"
                    strokeWidth={4}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )
            : "No more for now"}
        </div>
      </div>
    </div>
  );
}

export default CardList;
