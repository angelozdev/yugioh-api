import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="shadow-md sticky top-0 bg-white">
      <nav className="container">
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => {
                const className =
                  "text-white text-lg font-bold p-2 inline-block";
                return isActive ? `${className} bg-blue-900` : className;
              }}
              to="/"
            >
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
