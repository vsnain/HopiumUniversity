

import Link from 'next/link';
import React, { ReactNode } from 'react';
import Layout from './layout';
import 'tailwindcss/tailwind.css';



const Home = (props) => {
  return (
    <div>
      {/* {props} */}
      <div>
      {props.user ? (
        <>
          <span>Signed in as : {props.user.email}</span>
          {/* {console.log(props.user)} */}
          <button onClick={props.signOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={props.signIn}>Sign In</button>
      )}
    </div>
    
    </div>
  );
};

export default Home;