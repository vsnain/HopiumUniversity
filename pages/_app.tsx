// pages/_app.js
import 'tailwindcss/tailwind.css';
import React from 'react';
import ResponsiveAppBar from '../components/Navigation/Navbar';
// import '/././global.css'
import {NextUIProvider} from "@nextui-org/react";
import { AuthProvider } from '../components/AuthContext';
import { SessionProvider } from 'next-auth/react';



function MyApp({ Component, pageProps }) {
  
  // return <Component {...pageProps} />;
  return (
    <SessionProvider session={pageProps.session}>
    <AuthProvider>
    <NextUIProvider>
    
    <>
      <ResponsiveAppBar />
      <Component {...pageProps} />
    </>
    
    </NextUIProvider>
    </AuthProvider>
    </SessionProvider>
  )
}

export default MyApp;