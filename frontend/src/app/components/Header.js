"use client";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Header = () => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const currentDate = new Date();
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions);

  const stockData = [
    { ticker: "NASDAQ", movement: 0.85, trend: "up" },
    { ticker: "DOW", movement: -0.23, trend: "down" },
    { ticker: "S&P 500", movement: 0.42, trend: "up" },
  ];

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.title}>
            News Aggregator
          </Link>
          <div className={styles.categories}>
            <Link
              href="/?category=topHeadlines"
              className={`${styles.category} ${
                currentCategory === "topHeadlines" ? styles.active : ""
              }`}
            >
              Trending
            </Link>
            <Link
              href="/?category=business"
              className={`${styles.category} ${
                currentCategory === "business" ? styles.active : ""
              }`}
            >
              Business
            </Link>
            <Link
              href="/?category=entertainment"
              className={`${styles.category} ${
                currentCategory === "entertainment" ? styles.active : ""
              }`}
            >
              Entertainment
            </Link>
            <Link
              href="/?category=health"
              className={`${styles.category} ${
                currentCategory === "health" ? styles.active : ""
              }`}
            >
              Health
            </Link>
            <Link
              href="/?category=science"
              className={`${styles.category} ${
                currentCategory === "science" ? styles.active : ""
              }`}
            >
              Science
            </Link>
            <Link
              href="/?category=technology"
              className={`${styles.category} ${
                currentCategory === "technology" ? styles.active : ""
              }`}
            >
              Technology
            </Link>
            <Link
              href="/?category=sports"
              className={`${styles.category} ${
                currentCategory === "sports" ? styles.active : ""
              }`}
            >
              Sports
            </Link>
          </div>
          <div className={styles.dateContainer}>
            <span className={styles.date}>{formattedDate}</span>
            <span className={styles.timestamp}>at {formattedTime}</span>
          </div>
        </div>
      </div>
      <div className={styles.stockTickers}>
        {stockData.map((stock, index) => (
          <div key={index} className={styles.stockItem}>
            <span className={styles.stockTicker}>{stock.ticker}</span>
            <span
              className={`${styles.stockMovement} ${
                stock.trend === "up" ? styles.positive : styles.negative
              }`}
            >
              {stock.movement > 0 ? "▲" : "▼"} {Math.abs(stock.movement)}%
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Header;
