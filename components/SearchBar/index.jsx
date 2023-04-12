import styles from "./SearchBar.module.css";

const SearchBar = ({ ...rest }) => {
  return (
    <div className={`${styles.coin} animate__animated animate__fadeInUp`}>
      <input id="coinSearch" className={styles.coin_input} {...rest} />
    </div>
  );
};

export default SearchBar;
