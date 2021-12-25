import { useInfiniteQuery } from "react-query";

// utils
import cardsServices from "services/cards";

interface Options {
  query?: string;
  level?: string;
  sort?: string;
  order?: string;
}

const CARDS_PER_PAGE = 32;

function useCardList({ query, level, sort, order }: Options) {
  const cardQuery = useInfiniteQuery(
    ["card-list", { query, level, sort, order }],
    ({ pageParam }) =>
      cardsServices.getAll({
        fname: query,
        level,
        num: CARDS_PER_PAGE,
        offset: pageParam,
        order,
        sort,
      }),
    {
      getNextPageParam: (lastPage) => lastPage?.meta?.next_page_offset,
      staleTime: Infinity,
      retry: false,
    }
  );

  return cardQuery;
}

export default useCardList;
