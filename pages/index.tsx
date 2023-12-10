// components/Layout.js

import Link from 'next/link';
import React, { ReactNode } from 'react';
import Layout from './layout';
import 'tailwindcss/tailwind.css';
import {NextUIProvider} from "@nextui-org/react";
import { AuthProvider } from '../components/AuthContext';


const Home = ( { children } ) => {
  return (
    <div>
    
      {children}
    
    
    </div>
  );
};

export default Home;