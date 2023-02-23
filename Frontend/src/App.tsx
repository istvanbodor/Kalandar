import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import Login from './Components/Form/Login';
import Register from './Components/Form/Register';
import Layout from './Components/Layout/Layout';
import NoPage from './Components/Kalandar/NoPage';
import MainPage from './Components/Kalandar/MainPage';


function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoPage />} id="noPage"/> 
        </Route>
      </Routes>
    </BrowserRouter>  
    {/* <Register/> */}
    {/* <Login/> */}
    </>
  );
}

export default App;
