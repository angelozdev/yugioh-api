import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function useQueryParams() {
  const [searchParams] = useSearchParams();
  const paramsFromQuery = useMemo(
    () => ({
      attribute: searchParams.get("attribute") || "",
      level: searchParams.get("level") || "",
      order: searchParams.get("order") || "asc",
      q: searchParams.get("q") || "",
      sort: searchParams.get("sort") || "name",
    }),
    [searchParams]
  );

  return paramsFromQuery;
}

export default useQueryParams;
