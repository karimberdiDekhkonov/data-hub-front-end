import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GetCompany(){
    let navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [companyName, setName]= useState(null);

    const validition = async() =>{
        fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/company",{
          method:"GET",
          headers: {"Authorization": `Bearer ${token}`}
        }).then((res)=>{
          return res.json();
        }).then((resp)=>{
          setName(resp.message);
        }).catch((e)=>{
          navigate("/login")
        })
      }
      validition();

    return <div>
        {companyName}
    </div>;
}

export default GetCompany;