import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TableRow({tableToken, monthlyHours}){
    let navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [bigData, setbigData] = useState([]);
    const [started, setStarted] = useState(true);
    let updatedData = [];
    const getRows = async(tableToken) =>{
       if(started){
        setStarted(false);
        fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/daily?id=${tableToken}`,{
            method:"GET",
            headers: {"Authorization": `Bearer ${token}`}
          }).then((res)=>{
            return res.json();
          }).then((resp)=>{
            setbigData(resp);
            }).catch((e)=>{
              navigate("/owner/company")
            })
          }    
       }
    getRows(tableToken);

    for(let i = 1; i < 33; i++){
      bigData.map((day)=>{
        if(day.day===i){
          localStorage.setItem("lastDayId", day.id)
          updatedData.push(day)
        }
      })
     }
    return <tbody>
        {
               updatedData.map(day =>{
                return <tr>
                    <td className="fw-bolder">{day.day}</td>
                    <td>{day.workingHours}</td>
                    <td>{day.duration}</td>
                    <td className="text-sucess">{day.tip}</td>
                    <td>{day.tipReason}</td>
                    <td className="text-danger">{day.penalty}</td>
                    <td>{day.penaltyReason}</td>
                </tr>
              })
        }
         <tr className="fw-bolder">
          <td className="text-center" colspan="4">Monthly hours</td>
          <td className="text-center" colspan="3">{monthlyHours===null?`0 hours`:monthlyHours + " hours"}</td>
        </tr>   
      </tbody>
}

export default TableRow;