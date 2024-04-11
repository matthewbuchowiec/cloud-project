'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import styles from '../styles/News.module.css'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const News = () => {
  const [articles, setArticles] = useState([]);
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'topHeadlines';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/news/');
        const data = await response.json();
        const allArticles = data.flatMap(category => category.articles);
        const filteredArticles = allArticles.filter(
          article => article.url !== '[Removed]' && (category === 'topHeadlines' || data.find(cat => cat.category === category)?.articles.includes(article))
        );

        const articlesWithPlaceholders = filteredArticles.map(article => ({
          ...article,
          urlToImage: article.urlToImage === 'not_available' ? "https://placehold.co/600x400" : article.urlToImage,
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
                <Image src={article.urlToImage} alt={article.title} layout="fill" objectFit="cover" />
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
}

export default News;