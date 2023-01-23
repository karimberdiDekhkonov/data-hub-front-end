import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Countries() {
    const [selected, setSelected] = useState("Select your country");
  return (
    <Dropdown className='w-100'>
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="info">
        {selected}
      </Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        <Dropdown.Item onClick={() => setSelected("Poland")} >Poland</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelected("USA")} >USA</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelected("France")} >France</Dropdown.Item>
        <Dropdown.Divider />
      </Dropdown.Menu>
    </Dropdown>
  );
}