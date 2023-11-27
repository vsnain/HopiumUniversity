// pages/_app.js

import React from 'react';
import '/././global.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;