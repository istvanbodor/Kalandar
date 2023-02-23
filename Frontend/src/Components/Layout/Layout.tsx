import React from "react";
import './Layout.css'
import { Outlet, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
  return (
    <>
      <Nav as="ul" variant="tabs" className="justify-content-end">
          <Nav.Item as="li">
           <Nav.Link to="/" className=' mb-3' as={Link}>Kalandar</Nav.Link>
           </Nav.Item>

           <Nav.Item as="li">
            <Nav.Link to="/register" as={Link} >Register</Nav.Link>
            </Nav.Item>

            <Nav.Item as="li">
            <Nav.Link to="/login" as={Link}>Login</Nav.Link>
            </Nav.Item>
      </Nav>
      <Outlet />     
    </>
  )
};

export default Layout;