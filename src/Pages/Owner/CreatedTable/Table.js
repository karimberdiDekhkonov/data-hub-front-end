import React, { useState } from "react";
import './Table.scss'
import Button from 'react-bootstrap/Button';
import AddEmployee from '../../../components/TableDropdown'
import EditEmployee from '../../../components/EditEmployee'
import imageSource from '../../Public/Home/light.jpg'
import { Table } from "react-bootstrap";



function Profile(){
    const firstname = "Karimberdi";
    const tName = "Mama Kebab";
    const secondHead =["Day", "Hours", "Duration","Tip","Reason","Penalty","Reason"]
    const employees  = [
        {
            firstName:"Jamshid",
            January:[
                {
                    day:1,
                    workingHours:"10.00-18.00",
                    duration:10,
                    tip:20,
                    tipReason:"no reason",
                    penalty:20,
                    penaltyReason:"No reason"
                },
                {
                    day:1,
                    workingHours:"10.00-18.00",
                    duration:10,
                    tip:20,
                    tipReason:"no reason",
                    penalty:20,
                    penaltyReason:"No reason"
                }
            ]
        },
        {
            firstName:"Jamshid",
            January:[
                {
                    day:1,
                    workingHours:"10.00-18.00",
                    duration:10,
                    tip:20,
                    tipReason:"no reason",
                    penalty:20,
                    penaltyReason:"No reason"
                },
                {
                    day:1,
                    workingHours:"10.00-18.00",
                    duration:10,
                    tip:20,
                    tipReason:"no reason",
                    penalty:20,
                    penaltyReason:"No reason"
                }
            ]
        },
        {
            firstName:"Jamshid",
            January:[
                {
                    day:1,
                    workingHours:"10.00-18.00",
                    duration:10,
                    tip:20,
                    tipReason:"no reason",
                    penalty:20,
                    penaltyReason:"No reason"
                },
                {
                    day:1,
                    workingHours:"10.00-18.00",
                    duration:10,
                    tip:20,
                    tipReason:"no reason",
                    penalty:20,
                    penaltyReason:"No reason"
                }
            ]
        },
        {
            firstName:"Jamshid",
            January:[
                {
                    day:1,
                    workingHours:"10.00-18.00",
                    duration:10,
                    tip:20,
                    tipReason:"no reason",
                    penalty:20,
                    penaltyReason:"No reason"
                },
                {
                    day:1,
                    workingHours:"10.00-18.00",
                    duration:10,
                    tip:20,
                    tipReason:"no reason",
                    penalty:20,
                    penaltyReason:"No reason"
                }
            ]
        },
    ];
    const [active, setActive] = useState(3);
    let months = ["January", "February", "March", "April"];
  return ( 
    <>
      <header className="coontainer-fluid bg-header d-flex justify-content-between">
      <Button className="circle-btn gap-2 d-flex mt-2" variant="link" href="/owner/company">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-backspace mt-1" viewBox="0 0 16 16">
            <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
            <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
          </svg>
        </Button>
        <div className="d-flex gap-3">
          <p className="firstname">
            {firstname}
          </p>
          <img className="avatar" src={imageSource} alt="avatar" />
         </div>
      </header>
      <main className="container d-flex flex-column">
        <section className="d-flex justify-content-between">
        <div className="company-name fw-bolder fs-4 d-flex gap-3 mt-3">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-table" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
            </svg>
          </div>
          <p className="tName">{tName}</p>
        </div>
        <div className="mt-4">
          <AddEmployee/>
        </div>
        </section>
        <div className="d-flex table-container">
          {
            employees.map(employee =>{
                return <div className="table-width">
                    <Table className="table mt-5" striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th colspan="7" className="text-center">{employee.firstName}
                            <span>
                              <EditEmployee/>
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {
                            secondHead.map(head => {
                              return <td className="fw-bolder">
                                {head}
                              </td>
                            })
                          }
                        </tr>
                    
                        {
                          employee.January.map(days =>{
                            return <tr>
                                <td className="fw-bolder">{days.day}</td>
                                <td>{days.workingHours}</td>
                                <td>{days.duration}</td>
                                <td>{days.tip}</td>
                                <td>{days.tipReason}</td>
                                <td>{days.penalty}</td>
                                <td>{days.penaltyReason}</td>
                            </tr>
                          })
                        }
                      </tbody>
                    </Table>
                </div>
            })
          }
        </div>
      </main>
      <footer className="d-flex flex-column gap-5 mb-4 mt-2">
        <div className="months d-flex gap-2 justify-content-center">
          {
            months.map((month,i) =>{
              return <Button onClick={()=>setActive(i)} variant={active === i ? `primary`:`outline-primary`}>{month}</Button>
            })
          }
        </div>       
      </footer>
    </>
  );
}

export default Profile