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

  const handleFilters = (name: string, value: string) => {
    const params = {
      q: searchParams.get("q") || "",
      level: searchParams.get("level") || "",
      sort: searchParams.get("sort") || "name",
    };

    setSearchParams({ ...params, [name]: value });
  };

  return (
    <div className="inline-flex gap-2 overflow-x-scroll w-full no-scrollbar">
      <input
        className="border py-2 px-4 focus:shadow-lg rounded-sm max-w-full"
        type="search"
        placeholder="Search card..."
        onChange={({ target }) => handleFilters("q", target.value)}
        value={searchParams.get("q") || ""}
      />

      <select
        value={searchParams.get("level") || ""}
        onChange={({ target }) => handleFilters("level", target.value)}
        className="border py-2 px-4 focus:shadow-lg rounded-sm max-w-full bg-white"
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
        value={searchParams.get("sort") || "name"}
        onChange={({ target }) => handleFilters("sort", target.value)}
        className="border py-2 px-4 focus:shadow-lg rounded-sm max-w-full bg-white"
      >
        {sortBy.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Search;
