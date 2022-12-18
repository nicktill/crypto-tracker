import styles from "./Coins.module.css";
import Link from "next/link";

function formatNumber(number) {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return number.toString();
  }
}

function formatString(string) {
  const index = string.indexOf(" ");
  if (index !== -1) {
    return string.substring(0, index);
  } else {
    return string;
  }
}

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
                  <h1 className={styles.coin_heading}>{formatString(name)}</h1>
                </div>
              </div>
              <div className={styles.coin_data}>
                <p className={styles.coin_price}>${price.toFixed(2)}</p>
                <p className={styles.coin_volume}>${formatNumber(volume)}</p>
                {priceChange < 0 ? (
                  // if its negative show in red
                  <p className={(styles.coin_percent, styles.red)}>
                    {Number(priceChange).toFixed(2)}%
                  </p>
                ) : (
                  // otherwise its negative show in red
                  <p className={(styles.coin_percent, styles.green)}>
                    +{Number(priceChange).toFixed(2)}%
                  </p>
                )}
                <p className={styles.coin_marketcap}>
                  Mkt Cap: {formatNumber(marketcap)}
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
