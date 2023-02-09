import React from "react";
import './SignUp.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from 'axios'
import { json, useNavigate } from "react-router-dom";
import imgSource from './register.jpg'
import { Toast } from "bootstrap";

function SignUp(){
  let navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [repassword, setRepassword] = useState("");
  localStorage.clear();
  const validate = () =>{
    let result = true;
    
    if(firstname===null || firstname === ''){
      alert("Firstname is empty");
      result = false;
    }
    if(!email.includes("@")){
      alert('email must contain @')
      result = false;
    }
    if(email===null || email === ''){
      alert("Email is empty");
      result = false;
    }
    if(password===null || password === ''){
      alert("Password is empty");
      result = false;
    }
    if(!isNaN(password) || password.length <= 7){
      alert("Password must include a letter, number and 7 > length.");
      result = false;
    }
    if(password !== repassword){
      alert("Passwords are not matched");
      result = false;
    }
    return result;
  }

  const registerUser = async() =>{
    if(validate()){
      fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/auth/register", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          "firstname":firstname,
          "email":email,
          "password":password
        })
       }).then((res)=>{
         return res.json();
       }).then((resp=>{
        console.log(resp);
        localStorage.setItem("email",email);
        console.log(localStorage.getItem("user"));
        navigate("/verify")
       })).catch((err)=>{
         alert('Sign up failed due to ' + err.message);
       });
    }
  }
    return <div className="mega-signup-container">
         <Navbar bg="light" expand="lg">
        <Container className="navbar-container">
          <Navbar.Brand className="logo text-info"> Data<span className="bg-info logo rounded-4 text-light p-2">Hub</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-resp">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <Container className="d-flex mega-login-container">
        <div className="line"></div>
        <div className="login-container login-container-left d-flex gap-4 justify-content-center flex-column px-5">
        <p className="login-header">Sign up for a new account</p>
        <input 
            className="form-control" 
            placeholder="Firstname"
            value={firstname} 
            type="name" name="name" 
            id="name" 
            onChange={(e)=>setFirstname(e.target.value)}
            />
            <input className="form-control" 
            placeholder="Email" value={email} 
            type="email" 
            name="username" 
            id="username" 
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
            className="form-control" 
            placeholder="Create a password" 
            value={password} type="password" 
            name="password" id="password" 
            onChange={(e)=>setPassword(e.target.value)}
            />
            <input className="form-control" 
            placeholder="Confirm your password" 
            value={repassword} type="password" 
            name="password" 
            id="password" 
            onChange={(e)=>setRepassword(e.target.value)}
            />

            <div className="text-center">
              <Button variant="primary" onClick={registerUser}>
                Sign Up
              </Button>
              <div className="mt-4">
                Do you already have an account? <a href="/login">Login</a>
              </div>
            </div>
        </div> 
        <div className="login-container">
          <img src={imgSource} alt="login" />
        </div> 
      </Container> 
    </div>
}

export default SignUp