// components/Layout.js

import Link from 'next/link';
import React, { ReactNode } from 'react';
import Layout from './layout';
import 'tailwindcss/tailwind.css';
import {NextUIProvider} from "@nextui-org/react";


const Home = ( { children } ) => {
  return (
    <div>
    {/* <Layout> */}
      {children}
    {/* </Layout> */}
    </div>
  );
};

export default Home;