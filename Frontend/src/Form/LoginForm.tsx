import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Form.css"
import FormData, { User_Data } from "./FormData";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { NavLink } from "react-bootstrap";


const LoginForm = () => {
   const[user, setUser] = useState(User_Data)
   const[userName, setUserName] = useState("")
   const[errorMessage, setErrorMessages] = useState({})
   const[isSubmitted, setIsSubmitted] = useState(false)


   const UserName = (e :React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  
    } 

   //const ErrorMessage = ()

   if(userName === ""){

   }
    return(
        <>
        
    <Container className="container" id="LoginForm">
    <h1>Sign In</h1>
       <Form>
        <Form.Group className="mb-3">
            <Form.Label className="formText">Username</Form.Label>
            <Form.Control value={userName} onChange={UserName} type="text" placeholder="Enter username"/>
            {/* <Form.Text className="text-muted">We'll never share your data with anyone else.</Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label className="formText">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" id="buttonForm">Login</Button> 
        <NavLink  style={{float: "right"}}>Register</NavLink>    
        </Form>
        
    </Container>
        </>
    )   
}
export default LoginForm;