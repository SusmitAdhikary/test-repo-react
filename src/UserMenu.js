import React from "react";
import { useSelector } from 'react-redux';

function UserMenu() {  
  let userName = localStorage.getItem('first_name');
  if (userName){
    return (
      <div className="user-menu">              
        <ul>
          <li>Hi {userName}</li>
          <li className="nav-separator">|</li>
          <li><a href='/Registration'>Edit Profile</a></li>
          <li className="nav-separator">|</li>
          <li><a href='/Registration'>Logout</a></li>
        </ul>               
      </div>
    ); 
  }
  else {
    return (
      <div className="user-menu">              
        <ul>
          <li><a href='/login'>Login</a></li>
          <li className="nav-separator">|</li>
          <li><a href='/Registration'>Register</a></li>
        </ul>               
      </div>
    ); 
  }
	
}
export default UserMenu;