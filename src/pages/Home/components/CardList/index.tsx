import styles from "./card-list.module.css";

// types
import type { PropsWithChildren } from "react";

interface Props {
  isLoading: boolean;
  isSuccess: boolean;
  loading: () => JSX.Element | JSX.Element[];
  render?: () => JSX.Element;
}

function CardList({
  children,
  isLoading,
  isSuccess,
  loading,
  render,
}: PropsWithChildren<Props>) {
  const renderFun = render?.() || children;
  return (
    <ul className={styles["card-list"]}>
      {isLoading && loading()}
      {isSuccess && renderFun}
    </ul>
  );
}

export default CardList;
