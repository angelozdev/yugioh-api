import { NavLink, useNavigate } from "react-router-dom";

// components
import { Logout } from "components/icons";

// utils
import { useDeckContext } from "contexts/deck";
import styles from "./header.module.css";
import { routes } from "./fixtures";

// types
import type { PropsWithChildren } from "react";

function Header() {
  return (
    <Header.Container>
      <nav className={styles.navigation}>
        <Header.RouteList>
          {routes.map(({ label, path }) => (
            <Header.RouteItem key={path} path={path}>
              {label}
            </Header.RouteItem>
          ))}
        </Header.RouteList>
        <Header.ActionsContainer>
          <Header.LogoutButton />
        </Header.ActionsContainer>
      </nav>
    </Header.Container>
  );
}

function Container({ children }: PropsWithChildren<{}>) {
  return <header className={styles.container}>{children}</header>;
}

function RouteList({ children }: PropsWithChildren<{}>) {
  return <ul className={styles["route-list"]}>{children}</ul>;
}

function RouteItem({ children, path }: PropsWithChildren<{ path: string }>) {
  return (
    <li className={styles["route-item"]}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to={path}
      >
        {children}
      </NavLink>
    </li>
  );
}

function ActionsContainer({ children }: PropsWithChildren<{}>) {
  return <div className="ml-auto">{children}</div>;
}

function LogoutButton() {
  const { deckId, setDeckId } = useDeckContext();
  const navigate = useNavigate();

  if (!deckId) return null;
  return (
    <button
      onClick={() => {
        setDeckId("");
        navigate("/decks");
      }}
      className={styles["logout-button"]}
    >
      <Logout />
    </button>
  );
}

Header.ActionsContainer = ActionsContainer;
Header.Container = Container;
Header.LogoutButton = LogoutButton;
Header.RouteItem = RouteItem;
Header.RouteList = RouteList;

export default Header;
