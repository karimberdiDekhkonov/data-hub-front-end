import './Account.scss'
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import SmallModal from './SmallModal';
import UploadAttachment from './UploadAvatar';
import ChangePassword from './ChangePassword';
import ChangeName from './ChangeName';
import CreateCompany from './CreateCompany';



function Account(){
  let navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [company, setCompany] = useState(null);
  const [name, setName] = useState(null);
  const [imgSource, setImgSource] = useState(null);
  const [initial, setInitial] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const validition = async() =>{
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
    })
  }
  const getCompany = async() =>{
    fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/company",{
      method:"GET",
      headers: {"Authorization": `Bearer ${token}`}
    }).then((res)=>{
      return res.json();
    }).then((resp)=>{
      setCompany(resp.message);
    }).catch((e)=>{
      navigate("/login")
    })
  }
  validition();
  getCompany(); 
  
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
      <main className='container d-flex flex-column gap-5'>
        <div className="img-container m-auto">
            <div className="img-box">
            {
              imgSource===null?<div className="avatar-text-bigger">{initial}</div>:<img className="rounded-circle" src={imgSource} alt="" />
            }
            </div>
            <div className='edit-img d-flex flex-row-reverse'>
               <UploadAttachment/>
            </div>
        </div>
        <div className='name-container d-flex gap-3'>
            <p>Firstname :</p>
            <p>{name}</p>
            <ChangeName/>
        </div>
        <div className='name-container d-flex gap-3'>
            <p>Email :</p>
            <p>{email}</p>
        </div>
        <div className='name-container d-flex gap-3'>
            <p>Password :</p>
            <p>*******</p>
            <ChangePassword/>
        </div>
        <div className='name-container d-flex gap-3'>
            <p>Your company :</p>
            {
              company===null?<p>I'm your company name</p>:<p>{company}</p>
            }
            <CreateCompany/>
        </div>
        <div className='d-flex gap-4 mb-4'>
        <Button onClick={()=>localStorage.clear()} href='/' variant='info'>
            Log out
        </Button>
        <div>
            <SmallModal/>
        </div>
        </div>
      </main>
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="logo text-info fs-3 m-auto pt-2">Data<span className="bg-info logo rounded-4 text-light p-2">Hub</span></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-between">
          <ul className="gap-2 d-flex flex-column">
            <li>
              <Button variant="primary" href="/owner/account" className="fw-bold w-100 text-start d-flex gap-3">        
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
              <Button variant="light" href="/owner/summary" className="fw-bold w-100 text-start d-flex gap-3">
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
              ?? 2023 datahub.com
            </p>
          </div>    
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Account