import styles from "./Coins.module.css";
import Link from "next/link";

const Coins = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
  id,
}) => {
  return (
    <div className={styles.coin_section}>
      <Link href={`/coin/${id}`}>
        <a className={styles.coin_link}>
          <div className={styles.coin_container}>
            <div className={styles.coin_row}>
              <div className={styles.coin}>
                <img className={styles.coin_img} src={image} alt={name} />
                <div className={styles.coin_text}>
                  <h1 className={styles.coin_heading}>{name}</h1>
                </div>
              </div>
              <div className={styles.coin_data}>
                <p className={styles.coin_price}>${price}</p>
                <p className={styles.coin_volume}>${volume.toLocaleString()}</p>
                {priceChange < 0 ? (
                  // if its negative show in red
                  <p className={(styles.coin_percent, styles.red)}>
                    {priceChange.toFixed(2)}%
                  </p>
                ) : (
                  // otherwise its negative show in red
                  <p className={(styles.coin_percent, styles.green)}>
                    {priceChange.toFixed(2)}%
                  </p>
                )}
                <p className={styles.coin_marketcap}>
                  Mkt Cap: {marketcap.toLocaleString()}%
                </p>
                <br />
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Coins;
