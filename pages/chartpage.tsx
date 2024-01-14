// pages/ChartPage.js
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { promises as fs } from 'fs';

const Chart = dynamic(
  () => import('../components/Chart'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
);

const ChartPage = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Use the data passed as a prop
    if (data && data.length > 0) {
      setChartData(data);
    } else {
      // If data prop is not provided, fetch data from the local JSON file in the public directory
      fetch('/leetcode.json') // Adjust the path based on your project structure
        .then((response) => response.json())
        .then((result) => setChartData(result))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [data]);

  return (
    <div>
      <h1>LeetCode Data Visualization</h1>
      <Chart data={chartData} />
    </div>
  );
};

// This function is used for server-side rendering (SSR)
export async function getServerSideProps() {
  // Read the content of the local JSON file as text
  const fileContent = await fs.readFile('./leetcode.json', 'utf8');

  // Parse the text as JSON
  const jsonData = JSON.parse(fileContent);

  return {
    props: {
      data: jsonData,
    },
  };
}

export default ChartPage;
