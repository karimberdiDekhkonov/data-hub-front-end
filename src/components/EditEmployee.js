import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const employee = "Jack";
  const forEdit = [
    {
      hourly:20,
      monday:"10.00-18.00",
      tuesday:"10.00-18.00",
      wednesday:"10.00-18.00",
      thursday:"10.00-18.00",
      friday:"10.00-18.00",
      saturday:"Day off",
      sunday:"Day off",
    }
  ]

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
          <Modal.Title>Edit {employee}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='d-flex flex-column gap-2'>
              <div className='d-flex gap-5'>
                <div className="card-name text-info">
                  <p className='m-bot fs-small bg-white'>Tip</p>
                  <input className='form-control' type="number" placeholder='20 $' />
                </div>
                <div className="card-name text-info">
                  <p className='m-bot fs-small bg-white'>Reason</p>
                  <input className='form-control' type="text" placeholder='You worked well !' />
                </div>
              </div>
              <div className='d-flex gap-5'>
                <div className="card-name text-info">
                  <p className='m-bot fs-small bg-white'>Penalty</p>
                  <input className='form-control' type="number" placeholder='20 $' />
                </div>
                <div className="card-name text-info">
                  <p className='m-bot fs-small bg-white'>Reason</p>
                  <input className='form-control' type="text" placeholder='Latenesses !' />
                </div>
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Hourly</p>
                <input className='form-control' type="number" placeholder={forEdit[0].hourly} />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Monday</p>
                <input className='form-control' type="text" placeholder={forEdit[0].monday} />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Tuesday</p>
                <input className='form-control' type="text" placeholder={forEdit[0].tuesday} />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Wednesday</p>
                <input className='form-control' type="text" placeholder={forEdit[0].wednesday} />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Thursday</p>
                <input className='form-control' type="text" placeholder={forEdit[0].thursday} />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Friday</p>
                <input className='form-control' type="text" placeholder={forEdit[0].friday} />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Saturday</p>
                <input className='form-control' type="text" placeholder={forEdit[0].saturday} />
              </div>
              <div className="card-name text-info">
                <p className='m-bot fs-small bg-white'>Sunday</p>
                <input className='form-control' type="text" placeholder={forEdit[0].sunday} />
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;