import { Spin } from "components/icons";
import styles from "./spinner-page.module.css";

function SpinnerPage() {
  return (
    <div className={styles.container}>
      <Spin />
    </div>
  );
}

export default SpinnerPage;
