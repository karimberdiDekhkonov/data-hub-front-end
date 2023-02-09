import React from "react";
import { useState } from "react";

function ScheduleBody(data){
  const bigData = data.bigData;
  const [word, setWord] = useState(bigData.dayOff===null?"Day off":bigData.dayOff);
    return <tbody>
    <tr>
      <td className='fw-bolder'>Monday</td>    
      <td>{bigData.monday===word?"Day off":bigData.monday.substring(0, 5)}</td>
      <td>{bigData.monday===word?"Day off":bigData.monday.substring(6)}</td>
    </tr>
    <tr>
      <td className='fw-bolder'>Tuesday</td>    
      <td>{bigData.tuesday===word?"Day off":bigData.tuesday.substring(0, 5)}</td>
      <td>{bigData.tuesday===word?"Day off":bigData.tuesday.substring(6)}</td>
    </tr>
    <tr>
      <td className='fw-bolder'>Wednesday</td>    
      <td>{bigData.wednesday===word?"Day off":bigData.wednesday.substring(0, 5)}</td>
      <td>{bigData.wednesday===word?"Day off":bigData.wednesday.substring(6)}</td>
    </tr>
    <tr>
      <td className='fw-bolder'>Thursday</td>    
      <td>{bigData.thursday===word?"Day off":bigData.thursday.substring(0, 5)}</td>
      <td>{bigData.thursday===word?"Day off":bigData.thursday.substring(6)}</td>
    </tr>
    <tr>
      <td className='fw-bolder'>Friday</td>    
      <td>{bigData.friday===word?"Day off":bigData.friday.substring(0, 5)}</td>
      <td>{bigData.friday===word?"Day off":bigData.friday.substring(6)}</td>
    </tr>
    <tr>
      <td className='fw-bolder'>Saturday</td>    
      <td>{bigData.saturday===word?"Day off":bigData.saturday.substring(0, 5)}</td>
      <td>{bigData.saturday===word?"Day off":bigData.saturday.substring(6)}</td>
    </tr>
    <tr>
      <td className='fw-bolder'>Sunday</td>    
      <td>{bigData.sunday===word?"Day off":bigData.sunday.substring(0, 5)}</td>
      <td>{bigData.sunday===word?"Day off":bigData.sunday.substring(6)}</td>
    </tr>
  </tbody>
}

export default ScheduleBody;