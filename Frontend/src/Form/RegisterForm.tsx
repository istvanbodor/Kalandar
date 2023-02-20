import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Form.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import { NavLink } from "react-bootstrap";
import LoginForm from "./LoginForm";





const RegisterForm= () => {

    const[userName,setUserName] = useState("")


    const UserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }

    return(
        <>
    <Container className="container">
    <h1>Register</h1>
       <Form>
        <Form.Group className="mb-3">
            <Form.Label className="formText">Username</Form.Label>
            <Form.Control value={userName} onChange={UserName} type="text" placeholder="Enter username" required/>
            {/* <Form.Text className="text-muted">We'll never share your data with anyone else.</Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label className="formText">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label className="formText">Password Confirmation</Form.Label>
            <Form.Control type="password" placeholder="Password" required/>
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label className="formText">Email</Form.Label>
            <Form.Control type="email" placeholder="example@gmail.com" required/>
        </Form.Group>

        <Button variant="primary" type="submit" id="buttonForm">Register</Button>   
        {
             //<NavLink to="">Sign In</NavLink> 
        }
        </Form>
        <NavLink href="/LoginForm" style={{float: "right"}}>Sign In</NavLink> 
    </Container>

   
        </>
    )
}

export default RegisterForm;