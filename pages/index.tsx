import type { NextPage } from "next";
import Head from "../components/Head";
import styles from "../styles/Home.module.css";
import Search from "../components/Search";
import WatchList from "components/WatchList";
import { WatchedPairsProvider } from "context/WatchedPairsContext";
import TestNotification from "components/TestNotification";

const Home: NextPage = () => {
  return (
    <WatchedPairsProvider>
      <div className={styles.container}>
        <Head />
        <main className={styles.main}>
          <Search />
          <WatchList />
          <TestNotification />
        </main>
      </div>
    </WatchedPairsProvider>
  );
};

export default Home;
