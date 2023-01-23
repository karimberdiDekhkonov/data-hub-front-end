import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const joinLink = "datahub.com/asjahedhgs_join"

  return (
    <>
    <Button onClick={handleShow} variant="info" className=' d-flex gap-2 fs-small'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mt-1 bi bi-plus-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
            <span>New employee</span>
          </Button>
      <Modal className='max-width-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='d-flex flex-column gap-2'>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Email</p>
                <input className='form-control' type="email" placeholder='Enter his/her email address' />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Hourly</p>
                <input className='form-control' type="number" placeholder='Enter hourly salary amount' />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Monday</p>
                <input className='form-control' type="text" placeholder='10.00-18.00' />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Tuesday</p>
                <input className='form-control' type="text" placeholder='10.00-18.00' />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Wednesday</p>
                <input className='form-control' type="text" placeholder='10.00-18.00' />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Thursday</p>
                <input className='form-control' type="text" placeholder='10.00-18.00' />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Friday</p>
                <input className='form-control' type="text" placeholder='10.00-18.00' />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Saturday</p>
                <input className='form-control' type="text" placeholder='Day Off' />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Sunday</p>
                <input className='form-control' type="text" placeholder='Day Off' />
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;