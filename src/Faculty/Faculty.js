import React from 'react';
import Button from 'react-bootstrap/Button';

const faculty = (props) => {
  //var  Test = <div><p>Name : {props.name} </p><p>Designation: {props.designation}</p></div>;
  return (
    <div class="faculty-wrapper">
      <div class="faculty-block">
        <Button onClick={props.click}>Delete Faculty</Button>
        <p ><b>key</b> : {props.empid} </p>
        <p ><b>Name</b> : {props.name} </p>
        <p><b>Designation</b>: {props.designation}</p>
        <p><input type="text" value={props.name} onChange={props.changed} /></p>
      </div>      
    </div>
  )
  
}

export default faculty;
