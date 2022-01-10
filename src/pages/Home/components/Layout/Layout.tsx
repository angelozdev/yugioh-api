import styles from "./layout.module.css";

// types
import type { PropsWithChildren } from "react";

interface Props {
  header: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
}

function Layout({ header, content, footer }: PropsWithChildren<Props>) {
  return (
    <section className={styles["layout-container"]}>
      <div className={styles.header}>{header}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.footer}>{footer}</div>
    </section>
  );
}

export default Layout;
