import React from 'react';
import AuthContextProvider from './providers/AuthContextProvider';
import Navigation from './navigation/Navigation';

  
  

export default function App() {

  
  return (
    <>
    <AuthContextProvider>
    <Navigation />
    </AuthContextProvider>
    </>
  );
}


