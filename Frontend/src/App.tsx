import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterForm from './Form/RegisterForm';
import LoginForm from './Form/LoginForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
 {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter> */}
    <RegisterForm/>
    {/* <LoginForm/> */}
    </>
  );
}

export default App;
