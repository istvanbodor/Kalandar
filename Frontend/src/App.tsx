import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from './Form/Login';
import Register from './Form/Register';
import Layout from './Layout/Layout';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
           <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>

   
    {/* <Register/> */}
    {/* <Login/> */}
    </>
  );
}

export default App;
