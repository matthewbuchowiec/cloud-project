"use client";
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const SourceChart = ({ category }) => {
  const [renderData, setRenderData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + `/source/count/${category}/`
        );
        const resData = await response.json();
        const data = {
          labels: Object.keys(resData),
          datasets: [
            {
              label: "Sources",
              data: Object.values(resData),
              borderWidth: 1,
            },
          ],
        };
        console.log("Data:", data);
        setRenderData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchData();
  }, [category]);

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "300px", height: "300px" }}>
      {renderData && <Doughnut data={renderData} options={options} />}
    </div>
  );
};

export default SourceChart;
