import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ResetSalary from './ResetSalary';
import PenaltyVsTip from './PenaltyVsTip'
import { useNavigate } from 'react-router-dom';
import EmployeeSchedule from '../Pages/Owner/CreatedTable/EmployeeSchedule'

function MyModal() {
  const [joinedCompany, setJoinedCompany] = useState(null);
  let navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [imgSource, setImgSource] = useState(null);
  const [initial, setInitial] = useState(null);
  const [name, setName] = useState(".");
  const [email, setEmail] = useState(".");
  const [salary, setSalary] = useState(null);
  const [started, setStarted] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validition = async() =>{
    if(started){
      setStarted(false);
      fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/auth/getEmployee?email=${localStorage.getItem("employeeEmail")}`,{
        method:"GET",
        headers: {"Authorization": `Bearer ${token}`}
      }).then((res)=>{
        return res.json();
      }).then((resp)=>{
        setImgSource(resp.avatar!==null?null:resp.avatar);
        setName(resp.firstname);
        setEmail(resp.email);
        setInitial(resp.initialLetter);
        setJoinedCompany(resp.joinedCompanyId==null?null:resp.joinedCompanyId.name);
        setSalary(resp.salary);
      }).catch((e)=>{
        navigate("/owner/tableArea")
      });
    }
  }
  validition();
  return (
    <>
        <Button onClick={handleShow} variant="link" className="ms-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
        </Button>
      <Modal className='max-width-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit employee</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <div className='d-flex flex-column gap-2'>
            <Container>
              <div>
                <div className="d-flex gap-3 justify-content-center">
                  {
                    imgSource===null?<div className="avatar-text">{initial}</div>:<img className="avatar" src={imgSource} alt="" />
                  }
                </div>
              </div>
              <main className='mt-3 container d-flex flex-column gap-5'>
                <div className='name-container d-flex gap-3'>
                  <p>Firstname :</p>
                  <p>{name}</p>
                </div>
                <div className='name-container d-flex gap-3'>
                  <p>Email :</p>
                  <p>{email}</p>
                </div>
                <div className='name-container d-flex gap-3'>
                  <p>Joined company :</p>
                  {
                    joinedCompany===null?<p>You don't have company yet</p>:<p>{joinedCompany}</p>
                  }  
                </div>
                <div className='name-container d-flex gap-3'>
                  <p>Hourly salary :</p>
                  {
                    joinedCompany===null?<p>You don't have company yet</p>:<p>{salary}</p>
                  }  
                  <div>
                  <ResetSalary/>
                  </div>
                </div>
             </main>
            </Container>
            <EmployeeSchedule/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <PenaltyVsTip email={email}/>
          </div>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;