import React, { useState } from "react";
import './Summary.scss'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import MonthlyHours from "./MonthlyHours";
import MonthlySalary from "./MonthlySalary";



function Profile(){

    let navigate = useNavigate();
    let month = new Date().getMonth()+1;
    let months = ["January", "February", "March", "April","May","June","Jule","August","September","October","November","December"];
    let activeMonths = [];
    const [active, setActive] = useState(localStorage.getItem("month")===null?months[month-1]:localStorage.getItem("month"));

    if(localStorage.getItem("month")===null){
      localStorage.setItem("month", active);
      localStorage.setItem("monthId", month-1);
    }
    
    const setActiveMonthsToLocal = (monthName, monthId) =>{
      console.log(monthName)
      console.log(monthId)
      setActive(monthName);
      localStorage.setItem("month", monthName);
      localStorage.setItem("monthId", monthId);
    }
  
    const setActiveMonths = () =>{
    for (let i = 0; i < 4; i++) {
     if(month === 0){
      month = 12;
     }
     activeMonths.push(--month);
    }
    }
    setActiveMonths();

    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [imgSource, setImgSource] = useState(null);
    const [initial, setInitial] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [emails, setEmails] = useState([]);
 

    const [started, setStarted] = useState(true);


    const validition = async() =>{
      if(started){
         setStarted(false);
          fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/auth",{
            method:"GET",
            headers: {"Authorization": `Bearer ${token}`}
          }).then((res)=>{
            return res.json();
          }).then((resp)=>{
            setImgSource(resp.avatar!==null?null:resp.avatar);
            setName(resp.firstname);
            setEmail(resp.email);
            setInitial(resp.initialLetter);
          }).catch((e)=>{
            navigate("/login")
          });
           
          fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/auth/getEmployees`,{
            method:"GET",
            headers: {"Authorization": `Bearer ${token}`}
          }).then((res)=>{
            return res.json();
          }).then((resp)=>{
              resp.map((empl)=>{
                setEmails((prev)=>[...prev, empl.email])
              })
              navigate("/owner/summary")
            }).catch((e)=>{
              console.log(e.message);
            });
    }
  }
    validition();
  return ( 
    <>
       <header className="container-fluid bg-header d-flex justify-content-between">
        <Button className="circle-btn mt-2" variant="outline-link" onClick={handleShow}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </Button>
        <div className="d-flex gap-3">
          <p className="firstname">
            {name}
          </p>
          {
            imgSource===null?<div className="avatar-text">{initial}</div>:<img className="avatar" src={imgSource} alt="" />
          }
         </div>
      </header>
      <Container className="d-flex flex-column">
        <div>
          <Table className="my-3 table" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Montlhy hours</th>
                    <th>Monthly salary</th>
                </tr>
            </thead>
            <tbody>
                {
                    emails.map(iterator =>{
                        return <tr>
                            <td>{iterator}</td>
                            <td>
                              <MonthlyHours email={iterator}/>  
                            </td>
                            <td>
                              <MonthlySalary email={iterator}/>  
                            </td>
                        </tr>
                    })
                }
            </tbody>
          </Table>
        </div>  
      </Container>
      <Container className="d-flex flex-column gap-5 my-4">
        <div className="months d-flex flex-row-reverse gap-2 justify-content-center">
            {
              activeMonths.map((monthId) =>{
                return <Button href="/owner/summary" onClick={()=>setActiveMonthsToLocal(months[monthId], monthId)} variant={months[monthId]===active?`warning`:`outline-warning`}>{months[monthId]}</Button>
              })
            }
        </div>       
      </Container>
        <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="logo text-info fs-3 m-auto pt-2">Data<span className="bg-info logo rounded-4 text-light p-2">Hub</span></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-between">
          <ul className="gap-2 d-flex flex-column">
            <li>
              <Button variant="light" href="/owner/account" className="fw-bold w-100 text-start d-flex gap-3">        
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                </svg>
                <div>Profile</div>
              </Button>   
            </li>
            <li>
              <Button variant="light" href="/owner/company" className="fw-bold w-100 text-start d-flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
                  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
                  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
                </svg>
                <div>My Company</div>
              </Button>   
            </li>
            <li>
              <Button variant="primary" href="/owner/summary" className="fw-bold w-100 text-start d-flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
                  <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
                </svg>
                <div>Summary</div>
              </Button>   
            </li>
            <li>
              <Button href='/profile' variant="light" className="fw-bold w-100 text-start d-flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16">
                  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
                <div>Employee Profile</div>
              </Button>   
            </li>
          </ul>
          <div className="premium text-center d-flex justify-content-center gap-3 pt-3">
            <p className="fw-bolder">
              © 2023 datahub.com
            </p>
          </div>    
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Profile;