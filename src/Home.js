import React, { Component } from 'react';
import logo from './logo.svg';
import Nav from './Nav';
import './App.css';
import Faculty from './Faculty/Faculty';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import MyCarousel from './MyCarousel';


//import firebase from './firebase.js';
//function App() {
class Home extends Component {
  state = {
    faculties: [
      { empid: '1', name: "John Thomas", designation: "Reader" },
      { empid: '2', name: "Tommy Higher", designation: "Proffessor" },
      { empid: '3', name: "Mark Wizdel", designation: "Lab In-scharge.." }
    ],
    showFaculty : false,
    isLoading: true,
    users: [],
    error: null
  }

  fetchUsers() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }

  toggleFacultyHandler  = () => {
    const toggleFaculty = this.state.showFaculty;
    this.state.showFaculty = !toggleFaculty;
    this.setState( {showFaculty: !toggleFaculty });
  }

  switchNAmeHandler = () => {
    //console.log("Clicked!");
    this.setState( {
      faculties: [
        { empid: '1', name: "John Doe", designation: "Reader" },
        { empid: '2', name: "Tommy Higher", designation: "Proffessor" },
        { empid: '3', name: "Mark Wizdel", designation: "Lab In-scharge.." }
      ]
    } )
  }

  changeNAmeHandler = (event, id) => {
    const person = {
      ...this.state.faculties[id]
    };
    person.name = event.target.value;
    const persons = [...this.state.faculties];
    persons[id] = person;

    //console.log("Clicked!");
    this.setState({faculties : persons})  
  }

  deleteFacultyHandler = (fIndex) => {
    //const persons = this.state.faculties.slice(); //Copy of the array.
    const persons = [...this.state.faculties]; //take object from old array and create new array.
    persons.splice(fIndex, 1);
    this.setState({faculties : persons})    
  }

  render() {
    const carouselImages = ["banner1.jpg", "banner2.jpg", "banner3.jpg"];
    const { isLoading, users, error } = this.state;
    let facultyListNew = null;
    facultyListNew = (
      <div className="text-left">
        <React.Fragment>
          {error ? <p>{error.message}</p> : null}
          {!isLoading ? (
            users.map(user => {
              return (
                <div key={user.username} className="emp-wrap">
                  <p><b>User Name:</b> {user.username}</p>
                  <p><b>Name:</b> {user.name}</p>
                  <p><b>Email Address:</b> {user.email}</p>
                  <p><b>Address:</b> {user.address.street}, {user.address.city}</p>
                  <p><b>company :</b> {user.company.name}</p>
                </div>
              );
            })
          ) : (
            <h3>Loading...</h3>
          )}
        </React.Fragment>
      </div>
    );


    let facultyList = null;
    if (this.state.showFaculty) {
      facultyList = (
        <div>
          {this.state.faculties.map((faculty, index) => {
            return <Faculty
            //<button onClick={this.deleteFacultyHandler(index)}>Switch Faculty</button>
            click= {() => this.deleteFacultyHandler(index)}
            name={faculty.name}
            designation={faculty.designation} 
            empid={faculty.empid}
            changed={(event) => this.changeNAmeHandler(event, index)} />
          })}
        </div>
      )
    }

    return (
      <div className="Home">
               
        <Row class='main-wapper-paragraph'>          
          <Col>
            <MyCarousel imgs={carouselImages} />
            <h3>Faculty Member</h3>
            <Button onClick={this.switchNAmeHandler}>Switch Faculty</Button>&nbsp;&nbsp;
            <Button onClick={this.toggleFacultyHandler}>Toggle Faculty</Button>
            <h3>Static display using list :: Faculty Members</h3>
            {this.state.faculties.map(faculty => {
              return <Faculty
              name={faculty.name}
              designation={faculty.designation}
              empid={faculty.empid}
              changed={(event) => this.changeNAmeHandler(event, faculty.empid)} />
            })}
          </Col>          
        </Row> 
        <Row>
          <Col>
            { facultyList }
           </Col>
        </Row>  
        <Row> 
          <Col>
            <h3>Display using API Call :: Employee List</h3>
            <p>{ facultyListNew }</p>
          </Col>
        </Row>        
      </div>
    );
  }
 
}

export default Home;
