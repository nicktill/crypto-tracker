import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CoinList from "../components/CoinList";
import Layout from "../components/Layout";
import styles from "./Home.module.css";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.coin_app}>
        <h1 className="p-0">Crypto Tracker</h1>
        <SearchBar type="text" placeholder="Search" onChange={handleChange} />
        <CoinList coins={allCoins} />
      </div>
    </Layout>
  );
}
