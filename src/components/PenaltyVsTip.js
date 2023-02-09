import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function PenaltyVsTip(email) {
  
  let navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dayId, setDayId] = useState(localStorage.getItem("lastDayId"));
  const [tip, setTip] = useState(0);
  const [tipReason, setTipReason] = useState("Good job");
  const [penalty, setPenalty] = useState(0);
  const [penaltyReason, setPenaltyReason] = useState("Latenesses");
  const [started, setStarted] = useState(true);

  const validation = () =>{
    let result = true;
    if(tip < 0){
      alert("Tip can not be a minus!")
      result = false;
    }
    if(penalty < 0){
      alert("Penalty can not be a minus!")
      result = false;
    }
    if(tip > 100000){
      alert("Tip can not be a more than 100000!")
      result = false;
    }
    if(penalty > 100000){
      alert("Penalty can not be a more than 100000!")
      result = false;
    }
    return result;
  }

  const getMonthlyToken = async() =>{
    if(started){
      setStarted(false);
      fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/monthly/getByEmailAndMonth?email=${localStorage.getItem("employeeEmail")}&month=${localStorage.getItem("month")}`,{
        method:"GET",
        headers: {"Authorization": `Bearer ${token}`}
      }).then((res)=>{
        return res.json();
      }).then((resp)=>{
        console.log(resp)
        localStorage.setItem("eMonthlyToken", resp.id);
      }).catch((e)=>{
        navigate("/login")
      });
    }
  }
  getMonthlyToken();

  const putRequestFunction = async() =>{
    if(validation()){
      fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/daily/penaltyOrTip`,{
        method:"PUT",
        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type":"application/json"},
        body:JSON.stringify({
          "dailyTableId":dayId,
          "tip": tip,
          "tipReason": tipReason,
          "penalty": penalty,
          "penaltyReason": penaltyReason,
          "monthlyTableId": localStorage.getItem("eMonthlyToken")
        })
      }).then((res)=>{
        return res.json();
      }).then((resp)=>{
        alert(resp.message);
        handleClose();
      }).catch((e)=>{
        console.log(e.message);
      });
         
    }
  }
  return (
    <>
      <Button className="w-100 gap-2 d-flex" variant="success" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-credit-card-fill" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z"/>
        </svg>
        Penalty or Tip for today
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <div className='d-flex gap-5'>
                <div className="card-name text-success">
                  <p className='m-bot fs-small bg-white'>Tip</p>
                  <input onChange={(e)=>{setTip(e.target.value)}} className='form-control' type="number" placeholder='20 $' />
                </div>
                <div className="card-name text-success">
                  <p className='m-bot fs-small bg-white'>Reason</p>
                  <input onChange={(e)=>{setTipReason(e.target.value)}} className='form-control' type="text" placeholder='Good job !' />
                </div>
              </div>
              <div className='mt-2 d-flex gap-5'>
                <div className="card-name text-danger">
                  <p className='m-bot fs-small bg-white'>Penalty</p>
                  <input onChange={(e)=>{setPenalty(e.target.value)}} className='form-control' type="number" placeholder='20 $' />
                </div>
                <div className="card-name text-danger">
                  <p className='m-bot fs-small bg-white'>Reason</p>
                  <input onChange={(e)=>{setPenaltyReason(e.target.value)}} className='form-control' type="text" placeholder='Latenesses !' />
                </div>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>putRequestFunction()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PenaltyVsTip;