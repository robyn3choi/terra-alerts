import type { NextPage } from "next";
import Image from "next/image";
import Head from "../components/Head";
import styles from "../styles/Home.module.css";
import Search from "../components/Search";
import WatchList from "components/WatchList";
import { WatchedPairsProvider } from "context/WatchedPairsContext";

const Home: NextPage = () => {
  return (
    <WatchedPairsProvider>
      <div className={styles.container}>
        <Head />
        <main className={styles.main}>
          <Search />
          <WatchList />
        </main>
      </div>
    </WatchedPairsProvider>
  );
};

export default Home;
