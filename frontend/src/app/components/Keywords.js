"use client";
import React, { useState, useEffect } from "react";
import { TagCloud } from "react-tagcloud";
import styles from "../styles/Keywords.module.css";

const Keywords = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + "/keywords/"
          // "http://52.12.86.8:30001/keywords/"
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.conatainer}>
      <span className={styles.span}>Today's Keywords</span>
      <TagCloud minSize={50} maxSize={70} tags={data} />
    </div>
  );
};

export default Keywords;
