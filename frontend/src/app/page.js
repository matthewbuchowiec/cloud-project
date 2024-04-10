import Image from "next/image";
import styles from "./page.module.css";
import Footer from "./components/Footer";
import Header from "./components/Header"
import News from "./components/News"

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.container}>
        <News />
      </div>
      <Footer />
    </main>
  );
}