import React from "react";
import './SignUp.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";

function SignUp(){
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
        <div className="login-container d-flex mt-5 gap-4 justify-content-center flex-column shadow p-5">
            <input className="form-control" placeholder="Firstname" type="name" name="name" id="name" />
            <input className="form-control" placeholder="Email" type="email" name="username" id="username" />
            <input className="form-control" placeholder="Create a password" type="password" name="password" id="password" />
            <input className="form-control" placeholder="Retype your password" type="password" name="password" id="password" />
            <div className="text-center">
              <Button href="/profile">
                Sign Up
              </Button>
              <div className="mt-4">
                Do you already have an account? <a href="/login">Login</a>
              </div>
            </div>
        </div>
        <div className="login-circle bg-info"></div> 
    </div>
}

export default SignUp