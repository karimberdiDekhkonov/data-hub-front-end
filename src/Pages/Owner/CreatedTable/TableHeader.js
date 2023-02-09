import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import RenameTable from '../../../components/RenameTable'
import AddEmployee from '../../../components/AddEmployee'
import SelectMonth from '../../../components/SelectMonth'
import CompanyName from './CompanyName'
import { useNavigate } from 'react-router-dom';

function Example() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="company-name fw-bolder fs-4 d-flex gap-3 mt-3">
      <Button className="circle-btn mt-2" variant="outline-link" onClick={handleShow}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </Button>
        <p className="tName pt-2">{localStorage.getItem("table")}</p>
      </div>
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
        <Offcanvas.Title className="logo text-info fs-3 m-auto pt-2"><CompanyName/></Offcanvas.Title>
       </Offcanvas.Header>
        <Offcanvas.Body className='d-flex flex-column justify-content-between'>
            <Container className='d-flex flex-column gap-3'>
              <Button className="fw-bold w-100 text-start d-flex gap-3" variant="light" href="/owner/company">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                </svg>
                Home
              </Button>
              <AddEmployee/>
              <SelectMonth/>
              <RenameTable/>
          </Container>
          <Container>
          <div className="premium text-center d-flex justify-content-center gap-3 pt-3">
            <p className="fw-bolder">
              © 2023 datahub.com
            </p>
          </div> 
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example