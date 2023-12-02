// pages/index.js

import React, { ReactNode } from 'react';
import ResponsiveAppBar from '../components/Navigation/Navbar/index';



const Layout = ({ children }) => {
  return (
    <div>
      <ResponsiveAppBar />
      {/* <div>{children}</div> */}
    </div>
  );
};

export default Layout;