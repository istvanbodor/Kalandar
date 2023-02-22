import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Form.css"
import { User_Data } from "./FormData";
import { Container, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";




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
    <h1>Login</h1>
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

         <Button variant="primary" type="submit" id="buttonLogin">Login</Button>  
        <NavLink to="/register" style={{float: "right"}}>Register</NavLink> 
        </Form>
    </Container>
        </>
    )   
}
export default LoginForm;