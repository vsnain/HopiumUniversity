// components/Layout.js

import Link from 'next/link';
import React from 'react';
import Layout from './layout';

const Home = ({ children }) => {
  return (
    <Layout>
      
      {children}
    </Layout>
  );
};

export default Home;