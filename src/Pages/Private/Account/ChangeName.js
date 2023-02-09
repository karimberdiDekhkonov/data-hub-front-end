import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import './Account.scss'
function Example() {
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState(null);

  const editName = async() => {
    fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/auth/resetName",{
    method:"PUT",
    headers: {"Authorization": `Bearer ${token}`, "Content-Type":"application/json"},
    body:JSON.stringify({
      "name":name
    })
  }).then((res)=>{
    return res.json();
  }).then((resp)=>{
    navigate("/account")
    handleClose();
  }).catch((e)=>{
    alert(e.message);
    navigate("/account")
    handleClose();
  })
  }

  return (
    <>
      <div className='pointer' onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="text-warning bi bi-pencil fw-bold" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change your firstname</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input onChange={(e)=>{setName(e.target.value)}} className='form-control' placeholder='Enter your new name' type="text" name="" id="" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editName}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
}

export default Example;