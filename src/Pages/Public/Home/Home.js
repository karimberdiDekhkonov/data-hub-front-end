import React from "react";
import './Home.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import schedule from './light.jpg'
import Footer from '../../../components/Footer'
import { Button } from "react-bootstrap";


function Home(){
    return <>
    <div className="home-container">
      <Navbar bg="light" expand="lg">
        <Container className="navbar-container">
          <Navbar.Brand className="logo text-info"> Data<span className="bg-info logo rounded-4 text-light p-2">Hub</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-resp">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="home-main p-3">
        <section className="left-section pe-3">
          <p className="fs-3 mt-4 high-letter">DataHub is opensource platform to manage all of your company data and your employee's schedule.</p>
          <p className="fs-3 mt-4 fw-bolder text-danger ls mb-2">Fast, Relaiable and Worldwide</p> 
          <div className="d-flex flex-circle">
            <div className="bg-info circle"></div>
            <div className="d-flex justify-content-center gap-4 mt-3">
              <Button className="circle-btn btn-width" href="/login">Login</Button>
              <Button className="circle-btn" variant="outline-primary" href="/about">Know more</Button>
            </div>
          </div>
        </section>
        <section className="right-section">
          <img className="rounded-3" src={schedule} alt="schedule" />
        </section>
      </main> 
    </div>
    <Footer/>
    </>
}
export default Home;