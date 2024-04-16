"use client";
import React from "react";
import styles from "../styles/Content.module.css";
import { useSearchParams } from "next/navigation";
import News from "./News";
import Keywords from "./Keywords";
import SourceChart from "./SourceChart";

const Content = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      {category ? (
        <>
          <div className={styles.topContainer}>
            <Keywords category={category} />
            <SourceChart category={category} />
          </div>
          <News category={category} />
        </>
      ) : (
        <Keywords category={"total"} />
      )}
    </>
  );
};

export default Content;
