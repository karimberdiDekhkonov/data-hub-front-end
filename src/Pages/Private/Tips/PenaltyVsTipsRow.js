import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PenaltyVsTipsRow(tableToken){

    let navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [bigData, setbigData] = useState([]);
    const [started, setStarted] = useState(true);
    let updatedData = [];
    const getRows = async(tableToken) =>{
       if(started){
        setStarted(false);
        fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/daily?id=${tableToken.tableToken}`,{
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
          updatedData.push(day)
        }
      })
     }

    return <>
    <tbody>
        {
               updatedData.map(day =>{
                return <tr>
                    <td className="fw-bolder autofill">{day.day}</td>
                    <td className="text-center text-success" >{day.tip}</td>
                    <td className="text-center text-success">{day.tipReason}</td>
                    <td className="text-center text-danger">{day.penalty}</td>
                    <td className="text-center text-danger">{day.penaltyReason}</td>
                </tr>
              })
        }

        <tr className="fw-bolder">
          <td className="text-center" colspan="2">Monthly salary :</td>
          <td className="text-center text-success" colspan="3">{localStorage.getItem("totalHours")===null?`0`:localStorage.getItem("totaSalary")}</td>
        </tr>
         
      </tbody>

    </>
}

export default PenaltyVsTipsRow;