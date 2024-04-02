import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>News Fetcher</span>
          <div className={styles.categories}>
            <span>Business</span>
            <span>Entertainment</span>
            <span className={styles.active}>General</span>
            <span>Health</span>
            <span>Science</span>
            <span>Technology</span>
            <span>Sports</span>
            <span>More</span>
          </div>
          <span className={styles.date}>March 31, 2024</span>
        </div>
        <div className={styles.grid}>
          {Array(6).fill().map((_, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardImage}></div>
              <p>Trump's DJT stock creates a unique new ethical nightmare</p>
              <span>source: CNN</span>
            </div>
          ))}
        </div>
      </div>
      
    </main>
  );
}