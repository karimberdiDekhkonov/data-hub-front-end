import React, { useState } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Navigate, useNavigate } from 'react-router-dom';
import HoursInput from '../Pages/Owner/CreatedTable/HoursInput';

function MyModal() {
  let navigate = useNavigate();
  let currentMonth = new Date().getMonth();
  let months = ["January", "February", "March", "April","May","June","Jule","August","September","October","November","December"];
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let days = ["Monday", "Tuesday","Wednesday", "Thursday","Friday","Saturday", "Sunday"];
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");
  const [started, setStarted] = useState(true);
  const [tableId, setTableId] = useState(localStorage.getItem("tableId"));
  const [month, setMonth] = useState(localStorage.getItem("month"));
  const [users, setUsers] = useState([]);

  const validition = async() =>{
    if(started){
      setStarted(false); 
      fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/monthly/getByTableIdAndMonth?id=${tableId}&month=${month}`,{
        method:"GET",
        headers: {"Authorization": `Bearer ${token}`}
      }).then((res)=>{
        return res.json();
      }).then((resp)=>{
          setUsers(resp);
          navigate("/owner/tableArea")
        }).catch((e)=>{
          console.log(e.message);
        });
      }    
  }
  
  validition();

  const validate = () =>{
    let result = true;
    if(users.length > 20){
      alert('You can not add more than 20 emplyees')
      result = false;
    }
    if(email===localStorage.getItem("email")){
      alert('Please enter different email')
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
    if(salary===null || salary === ''){
      alert("Salary input is empty");
      result = false;
    }
    if(salary < 0){
      alert("Salary amount can not be minus");
      result = false;
    }
    return result;
  }

  const registerUser = async() =>{
    if(validate()){
      fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/auth/registerByOwner", {
        method:"POST",
        headers:{"Authorization": `Bearer ${token}`,"Content-Type":"application/json"},
        body:JSON.stringify({
          "email": email,
          "month": months[currentMonth],
          "tableId": localStorage.getItem("tableId"),
          "salary": salary,
          "monday": localStorage.getItem("Monday"),
          "tuesday": localStorage.getItem("Tuesday"),
          "wednesday": localStorage.getItem("Wednesday"),
          "thursday": localStorage.getItem("Thursday"),
          "friday": localStorage.getItem("Friday"), 
          "saturday": localStorage.getItem("Saturday"),
          "sunday": localStorage.getItem("Sunday")
        })
       }).then((res)=>{
         return res.json();
       }).then((resp=>{
         handleClose();
        navigate("/owner/tableArea");
        alert(resp.message)
       })).catch((err)=>{
        navigate("/owner/tableArea");
       });
    }
  }

  return (
    <>
        <Button onClick={handleShow} variant="light" className="fw-bold w-100 text-start d-flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="mt-1 bi bi-plus-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
            <span>New employee</span>
          </Button>
      <Modal className='max-width-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Scheduling section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='d-flex flex-column gap-2'>
            <div className='d-flex flex-column gap-2'>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Email</p>
                <input onChange={(e)=>{setEmail(e.target.value)}} className='form-control' type="email" placeholder='Enter his/her email address' />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Hourly</p>
                <input onChange={(e)=>{setSalary(e.target.value)}} className='form-control' type="number" placeholder='Enter hourly salary amount' />
              </div>
            </div>
              {
                days.map(day=>{
                  return <HoursInput dayType={day}/>
                })
              }
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={registerUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;