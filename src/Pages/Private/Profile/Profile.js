import React, { useState } from "react";
import './Profile.scss'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EmployeeTableRow from './EmployeeTableRow'
import HoursInput from "./HoursInputPrivate";



function Profile(){
    let month = new Date().getMonth()+1;
    let months = ["January", "February", "March", "April","May","June","Jule","August","September","October","November","December"];
    let activeMonths = [];
    const [active, setActive] = useState(localStorage.getItem("month")===null?months[month-1]:localStorage.getItem("month"));

    
  const setActiveMonthsToLocal = (monthName, monthId) =>{
    setActive(monthName);
    localStorage.setItem("month", monthName);
    localStorage.setItem("monthId", monthId);
    console.log(monthId);
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
  
    
    let navigate = useNavigate();
    const [joinedCompany, setJoinedCompany] = useState(null);
    const [name, setName] = useState(null);
    const [imgSource, setImgSource] = useState(null);
    const [initial, setInitial] = useState(null);
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [eMonthlyTableToken, setEMonthlyTableToken] = useState(null);
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
          setInitial(resp.initialLetter);
          setJoinedCompany(resp.joinedCompanyId==null?"Company name":resp.joinedCompanyId.name);
        }).catch((e)=>{
          navigate("/login")
        });
  
        fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/monthly/getByEmailAndMonth?email=${email}&month=${active}`,{
          method:"GET",
          headers: {"Authorization": `Bearer ${token}`}
        }).then((res)=>{
          return res.json();
        }).then((resp)=>{
          if(resp.id!=null) setEMonthlyTableToken(resp.id);
          localStorage.setItem("eMonthlyToken", resp.id);
          localStorage.setItem("totalHours", resp.totalHours);
        }).catch((e)=>{
          navigate("/login")
        });
      }
    }
    validition();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  return ( 
    <>
      <header className="coontainer-fluid bg-header d-flex justify-content-between">
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
        <div className="company-name fw-bolder fs-4 d-flex gap-3 mt-3">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
              <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
              <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
            </svg>
          </div>
          <p>{joinedCompany}</p>
        </div>
        <Table className="table mt-5" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Day</th>
              <th className="text-center">Working hours</th>
              <th className="text-center">Duration</th>
              <th className="autofill">Aotofill</th>
            </tr>
          </thead>
          {
            eMonthlyTableToken==null?null:<EmployeeTableRow tableToken={eMonthlyTableToken} />
          }
        </Table>
      </Container>
      <Container className="d-flex flex-column gap-5 my-4">
        <div className="months d-flex flex-row-reverse gap-2 justify-content-center">
            {
              activeMonths.map((monthId) =>{
                return <Button href='/profile' onClick={()=>setActiveMonthsToLocal(months[monthId], monthId)} variant={months[monthId]===active?`warning`:`outline-warning`}>{months[monthId]}</Button>
              })
            }
        </div>       
      </Container>
      <footer className="prof-footer d-flex bg-smoke">
        <HoursInput dayType="Day:" />
      </footer>
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="logo text-info fs-3 m-auto pt-2">Data<span className="bg-info logo rounded-4 text-light p-2">Hub</span></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-between">
          <ul className="gap-2 d-flex flex-column">
            <li>
              <Button variant="light" href="/account" className="fw-bold w-100 text-start d-flex gap-3">        
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                </svg>
                <div>Profile</div>
              </Button>   
            </li>
            <li>
              <Button variant="primary" href="/profile" className="fw-bold w-100 text-start d-flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
                  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
                  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
                </svg>
                <div>My Company</div>
              </Button>   
            </li> 
            <li>
              <Button variant="light" href="/myschedule" className="fw-bold w-100 text-start d-flex gap-3">        
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-calendar-date" viewBox="0 0 16 16">
                  <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
                <div>My Schedule</div>
              </Button>   
            </li>
            <li>
              <Button variant="light" href='/tips' className="fw-bold w-100 text-start d-flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                </svg>
                <div>Penalties vs Tips</div>
              </Button>   
            </li>
            <li>
              <Button variant="light" href='/owner/company' className="fw-bold w-100 text-start d-flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16">
                  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
                <div> Owner Profile</div>
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

export default Profile