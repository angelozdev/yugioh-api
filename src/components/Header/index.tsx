import { useDeckQuery } from "hooks";
import { NavLink } from "react-router-dom";
import { routes } from "./fixtures";

function Header() {
  const deckQuery = useDeckQuery("fUCAw3WlzoN54yWQMK7M");

  return (
    <header className="shadow-md sticky top-0 bg-white z-50">
      <nav className="container">
        <ul className="flex">
          {routes.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                className={({ isActive }) => {
                  const className = "text-lg font-bold p-2 inline-block";
                  return isActive
                    ? `${className} bg-blue-900 text-white`
                    : className;
                }}
                to={path}
              >
                {typeof label === "function"
                  ? label(deckQuery.data?.cards.length)
                  : label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
