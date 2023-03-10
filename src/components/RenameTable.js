import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function MyModal() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const tableName = useState(localStorage.getItem("table"));
  const [newName, setNewName] = useState(null);
 

  const renameTable = async() =>{
  fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/table",{
    method:"PUT",
    headers: {"Authorization": `Bearer ${token}`, "Content-Type":"application/json"},
    body:JSON.stringify({
      "name": `${tableName[0]}`,
      "newName": newName
    })
  }).then((res)=>{
    return res.json();
  }).then((resp)=>{
      alert(resp.message);
      navigate("/owner/company");
  }).catch((e)=>{
    alert(e.message);
    handleClose();
  })
}
  
  return (
    <>
    <Button onClick={handleShow} className="fw-bold w-100 text-start d-flex gap-3" variant="light">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="mt-1 bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
      </svg>
            <span>Rename table</span>
          </Button>
      <Modal className='max-width-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rename table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input onChange={(e)=>{setNewName(e.target.value)}} className='form-control' type="text" name="tableName" id="tableName" placeholder='New name' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={renameTable}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;