import React from 'react';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function CradType() {
  const [selected, setSelected] = useState("Card type");
  return (
    <Dropdown className='w-100'>
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="info">
        {selected}
      </Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        <Dropdown.Item onClick={() => setSelected("Visa")} >Visa</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelected("Credit")}>Credit</Dropdown.Item>
        <Dropdown.Item onClick={() => setSelected("Debit")}>Debit</Dropdown.Item>
        <Dropdown.Divider />
      </Dropdown.Menu>
    </Dropdown>
  );
}