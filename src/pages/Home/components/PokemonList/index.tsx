import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import cardsAPI from "api/cards";
import { CardPlaceholder } from "../";

function PokemonList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching, isSuccess } =
    useInfiniteQuery(
      "pokemon-list",
      ({ pageParam }) => cardsAPI.getAll({ offset: pageParam }),
      {
        getNextPageParam: (lastPage) => lastPage.meta.next_page_offset,
        staleTime: Infinity,
      }
    );

  return (
    <div className="container py-4">
      <ul className="grid sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4">
        {isSuccess &&
          data?.pages?.map((page) =>
            page.data?.map(({ id, name, card_images, desc }) => (
              <li className="border rounded-md shadow-md" key={id}>
                <Link className="p-4 w-full flex gap-4" to="/">
                  <figure className="basis-32">
                    <img src={card_images[0].image_url_small} alt={name} />
                  </figure>

                  <div className="grow basis-80">
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p>{desc.slice(0, 100)}...</p>
                  </div>
                </Link>
              </li>
            ))
          )}

        {isLoading &&
          Array(6)
            .fill(null)
            .map((_, index) => <CardPlaceholder key={index} />)}
      </ul>

      <div className="flex justify-center my-4">
        <button
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

export default PokemonList;
