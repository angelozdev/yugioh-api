import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "libs/react-query";

// utils
import cardsServices from "services/cards";

interface Options {
  query?: string;
  level?: string;
  sort?: string;
  order?: string;
  attribute?: string;
}

export const CARDS_PER_PAGE = 16;

function useCardList({ query, level, sort, order, attribute }: Options) {
  const cardQuery = useInfiniteQuery(
    queryKeys.cards.list({ query, level, sort, order, attribute }),
    ({ pageParam }) =>
      cardsServices.getMany({
        attribute,
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
