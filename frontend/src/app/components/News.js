"use client";
import React, { useState, useEffect } from "react";
import ExternalImage from "./ExternalImage";
import styles from "../styles/News.module.css";
import Link from "next/link";

const News = ({ category }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + "/news/"
        );
        const data = await response.json();
        const allArticles = data.flatMap((category) => category.articles);
        const filteredArticles = allArticles.filter(
          (article) =>
            article.url !== "[Removed]" &&
            (category === "topHeadlines" ||
              data
                .find((cat) => cat.category === category)
                ?.articles.includes(article))
        );

        const articlesWithPlaceholders = filteredArticles.map((article) => ({
          ...article,
          urlToImage:
            article.urlToImage === "not_available"
              ? "https://placehold.co/600x400"
              : article.urlToImage,
        }));

        setArticles(articlesWithPlaceholders);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      <div className={styles.grid}>
        {articles.map((article, index) => (
          <div key={index} className={styles.card}>
            {article.urlToImage && (
              <div className={styles.cardImage}>
                <ExternalImage src={article.urlToImage} alt={article.title} />
              </div>
            )}
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
              <p>{article.title}</p>
            </Link>
            <span>source: {article.source}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;
