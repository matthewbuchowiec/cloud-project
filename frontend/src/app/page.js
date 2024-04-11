import Image from "next/image";
import styles from "./page.module.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import News from "./components/News";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Suspense>
        <Header />
      </Suspense>
      <div className={styles.container}>
        <Suspense>
          <News />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
