import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CoinList from "../components/CoinList";
import Layout from "../components/Layout";
import styles from "./Home.module.css";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("name"); // added filter state
  const [order, setOrder] = useState("asc"); // added order state

  const FilterMenu = () => {
    return (
      <div className={styles.filterMenu}>
        <label htmlFor="filter" className={styles.filterMenuLabel}></label>
        <select
          id="filter"
          className={styles.filterMenuSelect}
          onChange={handleFilterChange}
          value={filter}
        >
          <option value="name">name</option>
          <option value="market_cap">market cap</option>
          <option value="price_change_percentage_24h">
            price change (24h)
          </option>
          <option value="current_price">price</option>
        </select>
        <label htmlFor="order" className={styles.filterMenuLabel}></label>
        <select
          id="order"
          className={styles.filterMenuSelect}
          onChange={handleOrderChange}
          value={order}
        >
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </div>
    );
  };

  useEffect(() => {
    async function fetchCoins() {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false"
      );
      const data = await res.json();
      setCoins(data);
    }
    fetchCoins();
  }, []);

  const allCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // added function to sort coins based on filter and order
  const sortedCoins = allCoins.sort((a, b) => {
    if (order === "asc") {
      return a[filter] - b[filter];
    } else {
      return b[filter] - a[filter];
    }
  });

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };

  // added function to handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // added function to handle order change
  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  return (
    <Layout>
      <div className={styles.coin_app}>
        <h1 className="p-0 ">Crypto Tracker</h1>
        <SearchBar type="text" placeholder="Search" onChange={handleChange} />
        <FilterMenu />
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
        <CoinList coins={sortedCoins} />
      </div>
    </Layout>
  );
}
