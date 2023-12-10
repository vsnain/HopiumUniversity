"use client"




// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

interface AuthContextType {
  isLoggedIn: boolean;
  userImage: string | undefined;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(!!session);

  useEffect(() => {
    setIsLoggedIn(!!session);
  }, [session]);

  const login = async () => {
    await signIn('google');
    // The session will be updated by the useEffect
  };

  const logout = async () => {
    await signOut();
    // The session will be updated by the useEffect
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userImage: session?.user?.image, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};









// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { signIn, signOut, useSession } from 'next-auth/react';

// interface AuthContextType {
//   isLoggedIn: boolean;
//   login: () => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const { data: session } = useSession();
//   const [isLoggedIn, setIsLoggedIn] = useState(!!session);

//   useEffect(() => {
//     setIsLoggedIn(!!session);
//   }, [session]);

//   const login = async () => {
//     await signIn('google');
//     // The session will be updated by the useEffect
//   };

//   const logout = async () => {
//     await signOut();
//     // The session will be updated by the useEffect
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
