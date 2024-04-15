"use client";
import React, { useState, useEffect } from "react";
import { TagCloud } from "react-tagcloud";
import styles from "../styles/Keywords.module.css";

const Keywords = ({ category }) => {
  const [data, setData] = useState([]);
  const [displayCategory, setDisplayCategory] = useState(category);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + `/keywords/${category}/`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchData();
    setDisplayCategory(category === "topHeadlines" ? "trending" : category);
  }, [category]);

  return (
    <div className={styles.conatainer}>
      <span className={styles.span}>
        Today's keywords for {displayCategory}
      </span>
      <TagCloud minSize={20} maxSize={40} tags={data} />
    </div>
  );
};

export default Keywords;
