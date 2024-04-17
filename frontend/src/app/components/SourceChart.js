"use client";
import React, { useState, useEffect, forwardRef } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const SourceChart = forwardRef(
  ({ category, setSelectedSource, counts }, ref) => {
    const [renderData, setRenderData] = useState();
    useEffect(() => {
      const entries = Object.entries(counts);
      entries.sort((a, b) => b[1] - a[1]);
      const sortedEntries = entries.slice(0, 7);
      const sortedData = Object.fromEntries(sortedEntries);
      const data = {
        labels: Object.keys(sortedData),
        datasets: [
          {
            label: "Sources",
            data: Object.values(sortedData),
            borderWidth: 1,
          },
        ],
      };
      setRenderData(data);
    }, [category, counts]);

    const handleClick = (_event, elements) => {
      if (elements.length !== 0) {
        const elementIndex = elements[0].index;
        const label = renderData.labels[elementIndex];
        setSelectedSource(label);
      }
    };

    const options = {
      maintainAspectRatio: false,
      onClick: handleClick,
    };

    return (
      <div style={{ width: "300px", height: "300px" }} ref={ref}>
        {renderData && <Doughnut data={renderData} options={options} />}
      </div>
    );
  }
);

export default SourceChart;
