import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function MyModal() {
  const navigate = useNavigate();
  const[name, setName] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [started, setStarted] = useState(true);
  const [tables, setTables] = useState(null);

  const validation = async() =>{
    if (started) {
        setStarted(false);
        fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/table/getAll",{
            method:"GET",
            headers: {"Authorization": `Bearer ${token}`}
          }).then((res)=>{
            return res.json();
          }).then((resp)=>{
            setTables(resp);
            navigate("/owner/company")
          }).catch((e)=>{
            navigate("/login")
          })   
    }
  }
  validation();

  const validate = () =>{
    let result = true;
    
    if(tables.length > 8){
      alert("You can not create more than 8 tables");
      result = false;
    }
    if(name===null || name === '' || name.length > 10){
      alert("Name either null or it has more then 10 letters");
      result = false;
    }
    return result;
  }

  const createTable = async() =>{
    if(validate()){
      fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/table", {
        method:"POST",
        headers:{"Content-Type":"application/json", "Authorization": `Bearer ${token}`},
        body:JSON.stringify({
          "name":name,
        })
       }).then((res)=>{
         return res.json();
       }).then((resp=>{
        alert(resp.message +" you can see it after refreshing the page");
        handleClose();
        navigate("/owner/company");
       })).catch((err)=>{
        navigate("/login");
       });
    }
  }

  return (
    <>
    <Button onClick={handleShow} variant="outline-primary" class="my-col border py-3 rounded-2">
        <div className="m-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
        </div>
        <p className="m-auto">New table</p>
    </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input onChange={(e)=>{setName(e.target.value)}} className='form-control' placeholder='Table name' type="text" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createTable}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;