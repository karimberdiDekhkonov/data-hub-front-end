import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyModal from "../../../components/MyModal";

function TablesContainer(){

  const [tables, setTables] = useState([]);
  const [tablesId, setTablesId] = useState([]);
  const [started, setStarted] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  let navigate = useNavigate();
    const setNameAndId = (name, id) =>{
      localStorage.setItem("table", name);
      localStorage.setItem("tableId", id);
    }
    const createTable = async() =>{
        if (started) {
            setStarted(false);
            fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/table/getAll",{
                method:"GET",
                headers: {"Authorization": `Bearer ${token}`}
              }).then((res)=>{
                return res.json();
              }).then((resp)=>{
                resp.map((item)=>{
                    setTables((one)=>[...one,item.name]);
                    setTablesId((one)=>[...one,item.id]);
                })
                navigate("/owner/company")
              }).catch((e)=>{
                navigate("/login")
              })   
        }
    }
    createTable();
    return  <div class="my-row">
    {
      tables.map((table, i)=>{
        return <Button onClick={()=>setNameAndId(table, tablesId[i])} href={`/owner/tableArea`} variant="outline-secondary" class="my-col border py-3 rounded-2">
        <div className="m-auto pt-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-table" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
          </svg>
        </div>
        <p className="m-auto">{table}</p>
      </Button>
      })
    }
     <MyModal/>
  </div>
}


export default TablesContainer;