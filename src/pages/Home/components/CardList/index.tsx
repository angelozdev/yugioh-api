import { Fragment, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import cardsAPI from "api/cards";
import { CardPlaceholder, CardItem, Search } from "../";
import { useDebounceState, useIntersectionObserver } from "hooks";

function CardList() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const level = searchParams.get("level") || "";
  const sort = searchParams.get("sort") || "name";
  const [debounceQuery, setQuery] = useDebounceState(initialQuery, 500);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useInfiniteQuery(
    ["card-list", { query: debounceQuery, level, sort }],
    ({ pageParam }) =>
      cardsAPI.getAll({
        offset: pageParam,
        fname: debounceQuery,
        num: 16,
        level,
        sort,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.meta.next_page_offset,
      staleTime: Infinity,
      retry: false,
    }
  );

  useIntersectionObserver(
    buttonRef,
    { onVisible: () => !isError && fetchNextPage() },
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
      <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4">
        {isSuccess &&
          data?.pages?.map((page) =>
            page.data?.map(
              ({ id, name, card_images, desc, type, archetype }) => (
                <CardItem
                  description={desc}
                  id={id}
                  images={card_images}
                  key={id}
                  name={name}
                  type={type}
                  archetype={archetype}
                />
              )
            )
          )}

        {isLoading &&
          Array(16)
            .fill(null)
            .map((_, index) => <CardPlaceholder key={index} />)}
      </ul>

      <div className="flex justify-center my-4">
        <button
          ref={buttonRef}
          className="px-4 py-2 bg-indigo-600 text-white rounded-sm disabled:opacity-50 inline-flex items-center shadow-sm"
          onClick={() => fetchNextPage()}
          disabled={isFetching || !hasNextPage}
        >
          {hasNextPage ? (
            isFetching ? (
              <Fragment>
                <svg
                  className="animate-spin mr-2 h-5 w-5 text-white"
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
                Loading...
              </Fragment>
            ) : (
              "More"
            )
          ) : (
            "No more for now"
          )}
        </button>
      </div>
    </div>
  );
}

export default CardList;
