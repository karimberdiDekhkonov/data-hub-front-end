import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function Example() {
    let navigate = useNavigate();
    
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [smShow, setSmShow] = useState(false);
  const deleteAccount = async() =>{
    fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/auth",{
      method:"DELETE",
      headers: {"Authorization": `Bearer ${token}`}
    }).then((res)=>{
      return res.json();
    }).then((resp)=>{
        alert("Successfully deleted !")
        navigate("/");
    }).catch((e)=>{
      alert(e.message);
    })
  }
  return (
    <>
      <Button variant='danger' onClick={() => setSmShow(true)} className="me-2">
        Delete account
      </Button>
      <Modal
        size="lg"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm fs-5">
            Do you really want to delete your accaount?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex gap-5 mt-2'>
            <Button onClick={() => setSmShow(false)} variant='secondary'>Close</Button>
            <Button onClick={deleteAccount} variant='outline-danger'>Yes delete it</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;