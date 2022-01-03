import { Logout } from "components/icons";
import { useDeckContext } from "contexts/deck";
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "./fixtures";

function Header() {
  const { deckId, setDeckId } = useDeckContext();
  const navigate = useNavigate();

  return (
    <header className="shadow-md sticky top-0 bg-white z-50">
      <nav className="container">
        <ul className="flex items-center">
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
                {label}
              </NavLink>
            </li>
          ))}

          {deckId && (
            <li className="ml-auto">
              <button
                onClick={() => {
                  setDeckId("");
                  navigate("/decks");
                }}
                className="p-2 inline-block"
              >
                <Logout />
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
