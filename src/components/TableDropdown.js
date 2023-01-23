import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import AddEmployee from './AddEmployee'
import DeleteTable from './DeleteTable'
import ReanameTable from './RenameTable'

function BasicExample() {
  return (
    <Dropdown>
      <Dropdown.Toggle className='fs-small' variant="success" id="dropdown-basic">
        Table settings
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
            <AddEmployee/>
        </Dropdown.Item>
        <Dropdown.Item>
            <ReanameTable/>
        </Dropdown.Item>
        <Dropdown.Item>
             <DeleteTable/>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;