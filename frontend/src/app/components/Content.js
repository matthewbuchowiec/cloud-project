"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Content.module.css";
import { useSearchParams } from "next/navigation";
import News from "./News";
import Keywords from "./Keywords";
import SourceChart from "./SourceChart";

const Content = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [selectedSource, setSelectedSource] = useState(null);
  const [counts, setCounts] = React.useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    // Function to check if clicked outside of the chart
    const handleClickOutside = (event) => {
      if (chartRef.current && !chartRef.current.contains(event.target)) {
        setSelectedSource(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chartRef]);

  return (
    <>
      {category ? (
        <>
          <div className={styles.topContainer}>
            <Keywords category={category} />
            <SourceChart
              category={category}
              setSelectedSource={setSelectedSource}
              counts={counts}
              ref={chartRef}
            />
          </div>
          <News
            category={category}
            selectedSource={selectedSource}
            setCounts={setCounts}
          />
        </>
      ) : (
        <Keywords category={"total"} />
      )}
    </>
  );
};

export default Content;
