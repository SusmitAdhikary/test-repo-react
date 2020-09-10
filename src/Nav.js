import React, { Component } from "react";
import { NavLink } from "react-router-dom";   



class Nav extends Component {

  render() {
    return (
      <div id="Employee">
        <header>
          <nav>
            <ul>
              <li><a href='/'>Home</a></li>
              <li><a href='/faculty'>Faculty</a></li>
              <li><a href='/Employee'>Employee</a></li>
              <li><a href='/User'>Members</a></li>
            </ul>
          </nav>
        </header>     
        
      </div>
    );
  }
}
export default Nav;