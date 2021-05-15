import Head from "next/head";
import styles from "../styles/Home.module.css";
import HomeContent from "../components/HomeContent";

export default function Home() {
  return (
    <>
      <Head>
        <title>Yomitori | Home</title>
      </Head>
      <div className={styles.container}>
        <HomeContent />
      </div>
    </>
  );
}
