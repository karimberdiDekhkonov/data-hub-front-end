import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TableRow(tableToken){

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
          });
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
                    <td className="autofill">{day.day}</td>
                    <td className="text-center" >{day.workingHours}</td>
                    <td className="text-center">{day.duration}</td>
                    <td className={`autofill ${day.confrim===true?null:`text-primary cursors`}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                      </svg>
                    </td>
                </tr>
              })
        }
        <tr className="fw-bolder">
          <td className="text-center" colspan="2">Monthly hours</td>
          <td className="text-center" colspan="2">{localStorage.getItem("totalHours")===null?`0 hours`:localStorage.getItem("totalHours") + " hours"}</td>
        </tr>
            
      </tbody>

    </>
}

export default TableRow;