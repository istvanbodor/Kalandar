import React from "react";
import { Outlet, NavLink } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Kalandar</NavLink>
          </li>
          <li>
            <NavLink to="Register">Register</NavLink>
          </li>
          <li>
            <NavLink to="Login">Login</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;