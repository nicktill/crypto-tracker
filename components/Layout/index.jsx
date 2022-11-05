import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";

const Layout = ({ children, title = "Stonks | Home" }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
      </Head>
      <header className={styles.header}>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
