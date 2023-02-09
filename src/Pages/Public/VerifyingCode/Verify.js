import React from "react";
import './Verify.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OtpInput from "react18-input-otp";

function Verify(){
  let navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [otp, setOtp] = useState('');
  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };

  const validate = () =>{
    let result = true;
    if(otp.length !== 5){
      result = false;
      alert("it must be 5 numbers");
    }
    if(isNaN(otp)){
      alert("There is a letter")
      return false;
    }
    return result;
  }
  const verifyCode = async() =>{
    if(validate()){
      fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/auth/verifyEmail?email=${email}&emailCode=${otp}`,{
        method:"PUT"
      }).then((res)=>{
        return res.json();
      }).then((resp=>{
        if(resp.success){
        localStorage.setItem("token", resp.message)
        navigate("/profile");
       }
      else{
       alert("Code is wrong");
       setOtp("");
      }
       })).catch((err)=>{
         alert('Sign up failed due to ' + err.message);
       });
    }
  
  }
  const resendCode = async() =>{
      fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/auth/resend?email=${email}`,{
        method:"PUT"
      }).then((res)=>{
        return res.json();
      }).then((resp=>{
          console.log(resp);
        if(resp.success){
          alert(`Code is sent to ${email}`)
       }
       })).catch((err)=>{
         alert('Sign up failed due to ' + err.message);
       });
    }
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
        <div className="text-center mb-2 fs-5 text-secondary">Verify your email address</div>
        <div className="d-flex justify-content-center">
          <OtpInput className="otp" value={otp} onChange={handleChange} numInputs={5} separator={<span>-</span>} />
        </div>
        <div className="text-center">
         <div className="d-flex justify-content-center gap-3">
         <Button  variant="warning" onClick={resendCode} >
            Resend
          </Button>
         <Button variant="primary" onClick={verifyCode}>
            Submit
          </Button>
         </div>
          <div className="mt-4">
            Something is wrong with your email? <a href="/signup"> Change email</a>
          </div>
        </div>
      </div> 
      <div className="login-circle bg-info"></div>         
    </div>
}

 export default Verify;