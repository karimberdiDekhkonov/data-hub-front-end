import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';

function HoursInput({dayType}) {
    let navigate = useNavigate();
    const [salary, setSalary] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    var dateNow = new Date(); 
    var lastDate = new Date(dateNow.getFullYear(), localStorage.getItem("monthId") + 1, 0);
    const [lastDay, setLastDay] = useState(lastDate.getDate());
    const [startHour, setStartHour] = useState(0);
    const [startMinut, setStartMinut] = useState(0);
    const [stopHour, setStopHour] = useState(0);
    const [stopMinut, setStopMinut] = useState(0);
    const [dayoff, setDayyOff] = useState("Work day");
    const [updatedDay, setUpdatedDay] = useState(localStorage.getItem("day"));
    let hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    let minuts = [0,30];
    let dayoffornot = ["Work day", "Day off"];
 
    const toShow = (num) =>{
        if(num===0){
            return "00";
        }
        if(num < 9){
            return "0"+num;
        }
        else{
            return num;
        }
    }

    const setUpdateDayFunction= (e) =>{
      if(isNaN(e)){
        alert("Please enter number not letter")
        return false;
      }
      if(e <= 0 || e > lastDay){
        alert("Please enter a valid day")
        return false;
      }
      setUpdatedDay(e);
    }

    const setData = () =>{
      localStorage.setItem(updatedDay, dayoff==="Day off" ? "Day off" : (toShow(startHour) + "." + toShow(startMinut) + "-" + toShow(stopHour) + "." + toShow(stopMinut)))
    }
    setData();

    const getSalary = async() => {
      fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/auth",{
        method:"GET",
        headers: {"Authorization": `Bearer ${token}`}
      }).then((res)=>{
        return res.json();
      }).then((resp)=>{
        localStorage.setItem("salary", resp.salary);
      }).catch((e)=>{
        navigate("/login")
      });
    }
    getSalary();

    const dailyPostRequest = async() =>{
        let drn = localStorage.getItem(updatedDay)==="Day off"?"0":localStorage.getItem(updatedDay).substring(6, 8)-localStorage.getItem(updatedDay).substring(0, 2);
        let drnMinuts = localStorage.getItem(updatedDay)==="Day off"?"0":localStorage.getItem(updatedDay).substring(8, 10)* 100 - localStorage.getItem(updatedDay).substring(2, 4) * 100;
        if(drn < 1){
          drn = 24 + drn
        }
        if(drnMinuts < 0){
          console.log(drn)
          drn = drn-1;
          drnMinuts = 50;
        }
        if(drnMinuts === 30){
          drnMinuts = 50;
        }
        
        if(updatedDay===null){
          alert("Enter the day")
          return false;
        }

        fetch("http://ec2-3-76-198-93.eu-central-1.compute.amazonaws.com:8080/api/daily", {
          method:"POST",
          headers:{"Authorization": `Bearer ${token}`, "Content-Type":"application/json"},
          body:JSON.stringify({
            "monthlyTableId": localStorage.getItem("eMonthlyToken"),
            "workingHours": localStorage.getItem(updatedDay),
            "duration": drn +"."+ drnMinuts,
            "day": updatedDay,
            "confirm": true,
            "salary": localStorage.getItem("salary")
          })
         }).then((res)=>{
           return res.json();
         }).then((resp=>{
          alert(resp.message)
         })).catch((err)=>{
           alert(err.message);
         });
      
    }
  return (
    <div className="card-name text-info d-flex flex-column pt-2 gap-2">
      <div className='d-flex gap-3'>
        <p className='ms-1 fs-small bg-white'>{dayType}</p>
          <input placeholder="No" onChange={(e)=>{setUpdateDayFunction(e.target.value)}} className="bg-white day-displayer form-control" type="text" />        
        <div onClick={()=>{dailyPostRequest()}} className='autofill text-success cursor flex-1'>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
          </svg>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className={`d-flex gap-1 fs-3 text-dark ${dayoff===`Day off`?`opacity-50`:null}`}>
        <DropdownButton variant='outline-primary' id="dropdown-basic-button" title={toShow(startHour)}>
          {
            hours.map((startHour)=>{
                return  <Dropdown.Item onClick={()=>setStartHour(startHour)}>{startHour}</Dropdown.Item>
            })
        }
        </DropdownButton>
        <div>:</div>
        <DropdownButton variant='outline-primary' id="dropdown-basic-button" title={toShow(startMinut)}>
        {
            minuts.map((startMinut)=>{
                return  <Dropdown.Item onClick={()=>setStartMinut(startMinut)}>{startMinut}</Dropdown.Item>
            })
        }
       </DropdownButton>
        <div>-</div>
        <DropdownButton variant='outline-primary' id="dropdown-basic-button" title={toShow(stopHour)}>
        {
            hours.map((stopHour)=>{
                return  <Dropdown.Item onClick={()=>setStopHour(stopHour)}>{stopHour}</Dropdown.Item>
            })
        }
       </DropdownButton>
        <div>:</div>
        <DropdownButton variant='outline-primary' id="dropdown-basic-button" title={toShow(stopMinut)}>
        {
            minuts.map((stopMinut)=>{
                return  <Dropdown.Item onClick={()=>setStopMinut(stopMinut)}>{stopMinut}</Dropdown.Item>
            })
        }
       </DropdownButton>
        </div>
        <div className='mt-1 ms-2'>
        <DropdownButton variant='outline-primary' id="dropdown-basic-button" title={dayoff}>
          {
            dayoffornot.map((dayof)=>{
                return  <Dropdown.Item onClick={()=>setDayyOff(dayof)}>{dayof}</Dropdown.Item>
            })
          }
        </DropdownButton>
        </div>
      </div>
      <hr className='text-dark' />
    </div>
  );
}

export default HoursInput;