import { useEffectOnce, useLocalStorage, useQueryParams } from "hooks";
import { useSearchParams } from "react-router-dom";
import { sortBy, attributes } from "./fixtures";

function Search({ localStorageKey = "searchParams" }) {
  const params = useQueryParams();
  const [searchParamsFromLS, setSearchParamsFromSL] = useLocalStorage(
    localStorageKey,
    { defaultValue: params }
  );
  const { 1: setSearchParams } = useSearchParams(searchParamsFromLS);

  const handleFilters = (name: string, value: string) => {
    const newParams = { ...params, [name]: value };
    setSearchParams(newParams);
    setSearchParamsFromSL(newParams);
  };

  useEffectOnce(() => {
    setSearchParams(searchParamsFromLS);
  });

  return (
    <div className="inline-flex gap-2 overflow-x-scroll w-full no-scrollbar">
      <input
        className="border py-2 px-4 focus:shadow-lg max-w-full cursor-text rounded-none"
        type="search"
        placeholder="Search card..."
        onChange={({ target }) => handleFilters("q", target.value)}
        value={params["q"]}
      />

      <select
        value={params.attribute}
        onChange={({ target }) => handleFilters("attribute", target.value)}
        className="border py-2 px-4 focus:shadow-lg rounded-sm max-w-full bg-white cursor-pointer"
      >
        {attributes.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={params.level}
        onChange={({ target }) => handleFilters("level", target.value)}
        className="border py-2 px-4 focus:shadow-lg rounded-sm max-w-full bg-white cursor-pointer"
      >
        <option value="">All levels</option>
        <option value="no-level">No level</option>
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <option value={i + 1} key={i}>
              {i + 1} level
            </option>
          ))}
      </select>

      <select
        value={params["sort"]}
        onChange={({ target }) => handleFilters("sort", target.value)}
        className="border py-2 px-4 focus:shadow-lg rounded-sm max-w-full bg-white cursor-pointer"
      >
        {sortBy.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>

      <input
        className="border py-2 px-4 uppercase cursor-pointer rounded-none"
        type="button"
        value={params["order"]}
        onClick={() =>
          handleFilters("order", params.order === "asc" ? "desc" : "asc")
        }
      />
    </div>
  );
}

export default Search;
