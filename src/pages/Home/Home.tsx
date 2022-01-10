import { useEffect, useRef } from "react";

// utils
import {
  useCardList,
  useDebounceState,
  useIntersectionObserver,
  useQueryParams,
} from "hooks";

// components
import { Spin } from "components/icons";
import { Layout, Search } from "./components";
import { Content, Footer } from "./components/Layout";

function Home() {
  const divRef = useRef<HTMLDivElement>(null);
  const paramsFromQuery = useQueryParams();
  const [debounceQuery, setQuery] = useDebounceState(paramsFromQuery.q, 500);
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
    setQuery(paramsFromQuery.q || "");
  }, [paramsFromQuery.q, setQuery]);

  return (
    <Layout
      header={<Search />}
      content={
        <Content data={data} isLoading={isLoading} isSuccess={isSuccess} />
      }
      footer={
        <Footer ref={divRef}>
          {hasNextPage ? isFetching && <Spin /> : "No more for now"}
        </Footer>
      }
    />
  );
}

export default Home;
