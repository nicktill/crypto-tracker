import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";

const Layout = ({ children, title = "Crypto Dashboard" }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/1200x1200.png" />
      </Head>
      <header className={styles.header}></header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
