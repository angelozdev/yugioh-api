import { useSearchParams } from "react-router-dom";

// atk, def, name, type, level, id, new
const sortBy = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "atk",
    label: "Attack",
  },
  {
    value: "def",
    label: "Defense",
  },
  {
    value: "type",
    label: "Type",
  },
  {
    value: "level",
    label: "Level",
  },
  {
    value: "new",
    label: "New",
  },
  {
    value: "id",
    label: "ID",
  },
];

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = {
    level: searchParams.get("level") || "",
    q: searchParams.get("q") || "",
    sort: searchParams.get("sort") || "name",
    sortorder: searchParams.get("sortorder") || "desc",
  };

  const handleFilters = (name: string, value: string) => {
    setSearchParams({ ...params, [name]: value });
  };

  return (
    <div className="inline-flex gap-2 overflow-x-scroll w-full no-scrollbar">
      <input
        className="border py-2 px-4 focus:shadow-lg max-w-full cursor-pointer rounded-none"
        type="search"
        placeholder="Search card..."
        onChange={({ target }) => handleFilters("q", target.value)}
        value={params["q"]}
      />

      <select
        value={params.level}
        onChange={({ target }) => handleFilters("level", target.value)}
        className="border py-2 px-4 focus:shadow-lg rounded-sm max-w-full bg-white cursor-pointer"
      >
        <option value="">All levels</option>
        <option value="no-level">No level</option>
        {Array(8)
          .fill(undefined)
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
        value={params["sortorder"]}
        onClick={() =>
          handleFilters(
            "sortorder",
            params.sortorder === "desc" ? "asc" : "desc"
          )
        }
      />
    </div>
  );
}

export default Search;
