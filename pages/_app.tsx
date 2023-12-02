// pages/_app.js

import React from 'react';
import ResponsiveAppBar from '../components/Navigation/Navbar';
// import '/././global.css'

function MyApp({ Component, pageProps }) {
  
  // return <Component {...pageProps} />;
  return (
    <>
      <ResponsiveAppBar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;