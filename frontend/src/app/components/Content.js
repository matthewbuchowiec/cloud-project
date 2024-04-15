"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import News from "./News";
import Keywords from "./Keywords";

const Content = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      {category ? (
        <>
          <Keywords category={category} />
          <News category={category} />
        </>
      ) : (
        <Keywords category={"total"} />
      )}
    </>
  );
};

export default Content;
