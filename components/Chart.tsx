// components/Chart.js
import React from 'react';
import Plot from 'react-plotly.js';

const Chart = ({ data }) => {
  // Process data and format it for the chart
  const processData = (data) => {
    // Initialize count for each range
    const ranges = [0, 200, 400, 600, 800, 1000, 2400];
    const counts = new Array(ranges.length).fill(0);

    // Count solved problems in each range
    data.forEach((entry) => {
      const totalSolved = entry.totalSolved?.totalSolved;
      if (totalSolved !== undefined && totalSolved !== null) {
        for (let i = 0; i < ranges.length - 1; i++) {
          if (totalSolved >= ranges[i] && totalSolved < ranges[i + 1]) {
            counts[i]++;
            break; // Exit loop once the range is found
          }
        }
      }
    });

    // Create the chart data
    const chartData = [
      {
        type: 'bar',
        x: ranges.slice(0, -1).map((range) => `${range}-${ranges[ranges.indexOf(range) + 1]}`),
        y: counts,
        marker: { color: 'blue' },
      },
    ];

    return chartData;
  };

  return (
    <Plot
      data={processData(data)}
      layout={{
        width: 500,
        height: 300,
        title: 'LeetCode Solved Problems Visualization',
        xaxis: { title: 'Total Solved Problems Range' },
        yaxis: { title: 'Count' },
      }}
    />
  );
};

export default Chart;

