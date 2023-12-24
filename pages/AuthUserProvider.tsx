// AuthUserProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuthUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };

  const signOut = async () => {
    await firebase.auth().signOut();
  };

  const isLoggedIn = !!authUser;

  const value = {
    name: authUser?.displayName || '',
    email: authUser?.email || '',
    photo: authUser?.photoURL || '',
    uid:authUser?.uid||'',
    loading,
    isLoggedIn,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
