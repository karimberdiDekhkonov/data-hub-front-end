import React, { useState } from "react";
import './Table.scss'
import EditEmployee from '../../../components/EditEmployee'
import { Container, Table } from "react-bootstrap";
import TableHeader from "./TableHeader.js";
import { useNavigate } from "react-router-dom";
import TableRow from "./TableRow";



function Profile(){
    const secondHead =["Day", "Hours", "Duration","Tip","Reason","Penalty","Reason"]


    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    let months = ["January", "February", "March", "April","May","June","Jule","August","September","October","November","December"];

    let navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [month, setName]= useState(localStorage.getItem("month")===null?months[currentMonth]:localStorage.getItem("month"));
    const [tableId, setTableId]= useState(localStorage.getItem("tableId"));
    const [names, setNames] = useState([]);
    const [monthlyIds, setmonthlyIds] = useState([]);
    const [monthlyHours, setmonthlHours] = useState([]);
    const [started, setStarted] = useState(true);


    const validition = async() =>{
      if(started){
         setStarted(false);
         if(currentDay===1){
          fetch(`http://localhost:8080/api/monthly/monthlyUpdate`,{
            method:"POST",
            headers: {"Authorization": `Bearer ${token}`, "Content-Type":"application/json"},
            body:JSON.stringify({
              "mainTableId": tableId,
              "previousMonth": months[currentMonth-1],
              "month": months[currentMonth]
            })
          }).then((res)=>{
            return res.json();
          }).then((resp)=>{
            console.log(resp);
            }).catch((e)=>{
              console.log(e.message);
            })
          }    
        fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/monthly/getByTableIdAndMonth?id=${tableId}&month=${month}`,{
          method:"GET",
          headers: {"Authorization": `Bearer ${token}`}
        }).then((res)=>{
          return res.json();
        }).then((resp)=>{
          localStorage.setItem("month", months[currentMonth])
          resp.map((one)=>{
            setNames((prev)=>[...prev,one.employee.email]); 
            setmonthlyIds((prev)=>[...prev,one.id]); 
            setmonthlHours((prev)=>[...prev,one.totalHours]); 
            
          })
            navigate("/owner/tableArea")
          }).catch((e)=>{
            console.log(e.message);
          });
        }    
    }
    validition();
    
  return ( 
    <>
      <header className="w-100">
        <TableHeader/>
      </header>
      {
        names.length===0?<Container className="text-secondary fs-5">You don't have any connected employees yet in {month} !</Container>:null
      }
      <Container className="d-flex flex-column">
         <div className="d-flex table-container">
          {
            names.map((nam, i) =>{
                return <div className="table-width">
                    <Table className="table mt-5" striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th colspan="7" className="text-center">{nam}
                            <span onClick={()=>{localStorage.setItem("employeeEmail", nam)}}>
                              <EditEmployee/>
                            </span>
                          </th>
                        </tr>
                        <tr>
                          {
                            secondHead.map(head => {
                              return <td className="fw-bolder">
                                 {head}
                              </td>
                            })
                          }
                        </tr>
                      </thead>
                      <TableRow tableToken={monthlyIds[i]} monthlyHours={monthlyHours[i]}/>
                    </Table>
                </div>
            })
          }
        </div>
      </Container>
    </>
  );
}

export default Profile