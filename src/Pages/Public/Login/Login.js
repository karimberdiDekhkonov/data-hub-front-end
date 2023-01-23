import React from "react";
import './Login.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";

function Login(){
    return <div className="mega-login-container">
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
      <div className="login-container d-flex gap-4 justify-content-center flex-column shadow p-5 mt-5">
        <input className="form-control" placeholder="Email" type="email" name="username" id="username" />
        <input className="form-control" placeholder="Password" type="password" name="password" id="password" />
        <div className="text-center">
          <Button href="/profile">
            Login
          </Button>
          <div className="mt-4">
            Are you new here? <a href="/signup"> Sign Up</a>
          </div>
        </div>
      </div> 
      <div className="login-circle bg-info"></div>         
    </div>
}

 export default Login;