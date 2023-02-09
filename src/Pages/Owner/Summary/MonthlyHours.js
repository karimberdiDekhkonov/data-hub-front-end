import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MonthlyHours(email){
    let navigate = useNavigate();
    const [result, setResult] = useState(0);
    const [month, setMonth] = useState(localStorage.getItem("month"))
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [started, setStarted] = useState(true);
    const validition = async() =>{
      if(started){
        setStarted(false);
        fetch(`http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/monthly/getByEmailAndMonth?email=${email.email}&month=${month}`,{
          method:"GET",
          headers: {"Authorization": `Bearer ${token}`}
        }).then((res)=>{
          return res.json();
        }).then((resp)=>{
          if(resp.totalHours!==null){
            setResult(resp.totalHours);
          }
        }).catch((e)=>{
          navigate("/owner/company")
        });
      }
    }
    validition();
   

    return <span>
      {result}
    </span>
}

export default MonthlyHours;