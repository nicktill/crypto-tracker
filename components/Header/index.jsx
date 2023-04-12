import styles from "./Header.module.css";
import "animate.css";

const Header = () => {
  return (
    <div
      className={`animate__animated animate__fadeInDown ${styles.coinGroupLabels}`}
    >
      <div className={styles.coinGroupInner}>
        <div
          className={`animate__animated animate_fadeInDown ${styles.coinGroupLabel}`}
        >
          Currency
        </div>
        <div className={styles.coinGroupLabel}></div>
        <div
          className={`animate__animated animate_fadeInDown ${styles.coinGroupLabel}`}
        >
          Price
        </div>
      </div>
      <div
        className={`animate__animated animate_fadeInDown ${styles.coinGroupLabel}`}
      >
        Volume
      </div>
      <div
        className={`animate__animated animate_fadeInDown ${styles.coinGroupLabel}`}
      >
        Change
      </div>
      <div
        className={`animate__animated animate__fadeInUp ${styles.coinGroupLabel}`}
      >
        Market Cap
      </div>
    </div>
  );
};

export default Header;
