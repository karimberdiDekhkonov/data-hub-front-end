import React, { useState } from 'react';
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
 

  const deleteTable = async() =>{
    console.log(`${tableName[0]}`);
  fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/table",{
    method:"DELETE",
    headers: {"Authorization": `Bearer ${token}`, "Content-Type":"application/json"},
    body:JSON.stringify({
      "name": `${tableName[0]}`
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
    <Button onClick={handleShow} variant="danger" className=' d-flex gap-2'>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mt-1 bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
      </svg>
            <span>Delete table</span>
          </Button>
      <Modal className='max-width-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you really wanto delete this table?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteTable}>
            Delete 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;