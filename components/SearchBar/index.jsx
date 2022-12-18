import styles from "./SearchBar.module.css";

const SearchBar = ({ ...rest }) => {
  return (
    <div className={styles.coin}>
      <input id="coinSearch" className={styles.coin_input} {...rest} />
    </div>
  );
};

export default SearchBar;
