import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: event.target.value });
  };

  return (
    <input
      className="border py-2 px-4 focus:shadow-lg rounded-sm w-72 max-w-full"
      type="search"
      placeholder="Search card..."
      onChange={handleSearch}
      defaultValue={searchParams.get("q") || ""}
    />
  );
}

export default Search;
