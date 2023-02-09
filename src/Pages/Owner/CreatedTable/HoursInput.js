import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function HoursInput(dayType) {
    const [startHour, setStartHour] = useState(0);
    const [startMinut, setStartMinut] = useState(0);
    const [stopHour, setStopHour] = useState(0);
    const [stopMinut, setStopMinut] = useState(0);
    const [dayoff, setDayyOff] = useState("Work day");
    let hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    let minuts = [0,30,];
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

    const setData = () =>{
      localStorage.setItem(dayType.dayType, dayoff==="Day off" ? "Day off" : (toShow(startHour) + "." + toShow(startMinut) + "-" + toShow(stopHour) + "." + toShow(stopMinut)))
    }
    setData();
  return (
    <div className="card-name text-info">
    
      <p className='m-bot fs-small bg-white'>{dayType.dayType}</p>
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
        <div className='mt-1'>
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