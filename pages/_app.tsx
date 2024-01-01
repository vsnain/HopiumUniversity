// pages/_app.js


import "firebase/compat/auth";
import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/Navigation/Navbar';
import { NextUIProvider } from '@nextui-org/react';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../firebase.config';
import { AuthProvider } from './AuthUserProvider';
import { getFirestore } from 'firebase/firestore';


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const firestore = getFirestore();


// Sign in and sign out functins
const signIn = () => auth.signInWithPopup(provider);
const signOut = () => auth.signOut();
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      setUser(user);
    });
  }, []);
  return (
  <AuthProvider>
        <NextUIProvider>
           <>
             <ResponsiveAppBar/>
             <Component 
                {...pageProps} 
                user={user} 
                signIn={signIn} 
                signOut={signOut} 
                firestore={firestore}
              />
          </>
         </NextUIProvider>
    </AuthProvider>
    
  );
}
export default MyApp;





// import 'tailwindcss/tailwind.css';
// import React, { useEffect, useState } from 'react';
// import ResponsiveAppBar from '../components/Navigation/Navbar';
// import { NextUIProvider } from '@nextui-org/react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import { firebaseConfig } from '../firebase.config';
// import { SessionProvider } from 'next-auth/react';

// // Firebase config


// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });

// function MyApp({ Component, pageProps }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <SessionProvider>
//     <NextUIProvider>
//       <>
//         <ResponsiveAppBar user={user} signIn={auth.signInWithPopup.bind(auth, provider)} signOut={auth.signOut.bind(auth)} />
//         <Component {...pageProps} user={user} signIn={auth.signInWithPopup.bind(auth, provider)} signOut={auth.signOut.bind(auth)} />
//       </>
//     </NextUIProvider>
//     </SessionProvider>
//   );
// }

// export default MyApp;
















// // pages/_app.js
// import 'tailwindcss/tailwind.css';
// import React from 'react';
// import ResponsiveAppBar from '../components/Navigation/Navbar';
// // import '/././global.css'
// import {NextUIProvider} from "@nextui-org/react";





// function MyApp({ Component, pageProps }) {
  
//   // return <Component {...pageProps} />;
//   return (
    
    
//     <NextUIProvider>
    
//     <>
//       <ResponsiveAppBar />
//       <Component {...pageProps} />
//     </>
    
//     </NextUIProvider>
    
//   )
// }

// export default MyApp;