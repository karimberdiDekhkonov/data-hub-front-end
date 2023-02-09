import React from "react";
import './Login.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgSourse from './login.png'

function Login(){
  let navigate = useNavigate();
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  localStorage.clear();

  const validate = () =>{
    let result = true;

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
    return result;
  }

  const login = async() =>{
    if(validate()){
      fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/auth/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          "email":email,
          "password":password
        })
      }).then((res)=>{
        return res.json();
      }).then((resp=>{
        if(resp.success){
          alert(resp.token);
        }else{
          localStorage.setItem("token", resp.token);
          localStorage.setItem("email", email);
          navigate("/profile");
        }
      })).catch((err)=>{
        alert('Sign up failed due to ' + err.message);
      });
    }
  }
  

    return <div>
         <Navbar bg="light" expand="lg">
        <Container className="navbar-container">
          <Navbar.Brand className="logo text-info"> Data<span className="bg-info logo rounded-4 text-light p-2">Hub</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-resp">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="d-flex mega-login-container">
        <div className="line"></div>
        <div className="login-container login-container-left d-flex gap-4 justify-content-center flex-column px-5">
          <p className="login-header">Login to your account</p>
          <div className="card-name text-info">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email" type="email"/>
          </div>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control mt-2" placeholder="Password" type="password" />
          <div className="text-center">
            <Button className="btn" onClick={login}>
              Login
            </Button>
            <div className="mt-4">
              Are you new here? <a href="/signup"> Sign Up</a>
            </div>
          </div>
        </div> 
        <div className="login-container">
          <img src={imgSourse} alt="login" />
        </div> 
      </Container>
     </div>
}

 export default Login;