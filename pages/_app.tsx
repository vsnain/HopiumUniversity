// pages/_app.js
import 'tailwindcss/tailwind.css';
import React from 'react';
import ResponsiveAppBar from '../components/Navigation/Navbar';
// import '/././global.css'
import {NextUIProvider} from "@nextui-org/react";



function MyApp({ Component, pageProps }) {
  
  // return <Component {...pageProps} />;
  return (
    <NextUIProvider>
    <>
      <ResponsiveAppBar />
      <Component {...pageProps} />
    </>
    </NextUIProvider>
  )
}

export default MyApp;