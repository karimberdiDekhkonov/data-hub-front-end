import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ResetSchedule from '../../../components/ResetSchedule'

function EmployeeSchedule(){
    let navigate = useNavigate();
    const [started,  setStarted] = useState(true);
    const [bigData, setBigData] = useState(
      {
        "monday":"Day off",
        "tuesday":"Day off",
        "wednesday":"Day off",
        "thursday":"Day off",
        "friday":"Day off",
        "saturday":"Day off",
        "sunday":"Day off",
        "dayOff":"Day off",
      }
    );

    const [token, setToken] = useState(localStorage.getItem("token"));

    const validition = async() =>{
      if(started){
        setStarted(false);
        fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/schedule/getByOwner?email=${localStorage.getItem("employeeEmail")}`,{
          method:"GET",
          headers: {"Authorization": `Bearer ${token}`}
        }).then((res)=>{
          return res.json();
        }).then((resp)=>{
          if(resp.monday!==null){
            setBigData(resp)
          }
        }).catch((e)=>{
          navigate("/owner/tableArea")
        });
      }
    }
    validition();
    return <Container>
      <div className='mt-5 justify-content-center name-container d-flex gap-3'>
          <p className="text-center fs-4 fw-bolder">
            Schedule
          </p>
          <div>
            <ResetSchedule/>
          </div>
        </div>
      <main className='mt-5 container d-flex flex-column gap-3'>
        <div className='name-container d-flex gap-3'>
          <p>Monday :</p>
          <p>{bigData.monday}</p>
        </div>
        <div className='name-container d-flex gap-3'>
          <p>Tuesday :</p>
          <p>{bigData.tuesday}</p>
        </div>
        <div className='name-container d-flex gap-3'>
          <p>Wednesday :</p>
          <p>{bigData.wednesday}</p>
        </div>
        <div className='name-container d-flex gap-3'>
          <p>Thursday :</p>
          <p>{bigData.thursday}</p>
        </div>
        <div className='name-container d-flex gap-3'>
          <p>Friday :</p>
          <p>{bigData.friday}</p>
        </div>
        <div className='name-container d-flex gap-3'>
          <p>Saturday :</p>
          <p>{bigData.saturday}</p>
        </div>
        <div className='name-container d-flex gap-3'>
          <p>Sunday :</p>
          <p>{bigData.sunday}</p>
        </div>
      </main>
    </Container>
}

export default EmployeeSchedule;