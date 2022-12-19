import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.coinGroupLabels}>
      <div className={styles.coinGroupInner}>
        <div className={styles.coinGroupLabel}>Currency</div>
        <div className={styles.coinGroupLabel}></div>
        <div className={styles.coinGroupLabel}>Price</div>
      </div>
      <div className={styles.coinGroupLabel}>Volume</div>
      <div className={styles.coinGroupLabel}>Change</div>
      <div className={styles.coinGroupLabel}>Market Cap</div>
    </div>
  );
};

export default Header;
