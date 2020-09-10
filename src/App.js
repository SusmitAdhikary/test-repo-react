import React, { Component } from 'react';
import logo from './logo.png';
import Nav from './Nav';
import './App.css';
import Faculty from './Faculty/Faculty';
import {
      Route,
      NavLink,
      BrowserRouter as Router,
      Switch
    } from "react-router-dom";  
import axios from 'axios';
import Facultypage from './Faculty';
import Employee from './Employee';
import Registration from './Registration';
import Home from './Home';
import User from './User';
import Login from './Login';
import {printHelloWorld} from './Actions/printHelloAction';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { useHistory } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import UserMenu from './UserMenu';




//import firebase from './firebase.js';


//function App() {
class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
    }   
    
  }
  
  /*
    printHelloWorld1= ()=>{
      console.log('Print Hello World Props..');
      this.props.Callhello("Test");
    }
  
  */
  
  render() {
    //const counter = useSelector(state => state.counter);
    //https://hackernoon.com/https-medium-com-heypb-react-redux-workflow-in-4-steps-beginner-friendly-guide-4aea9d56f5bd
    return (
      <Router>
      <div className="App">     
        <Container>
          <Row>          
            <Col className="App-logo">
              <a href="/"><img src={logo} alt="logo" width="150" /></a>
            </Col>
            <Col>
              <UserMenu/>              
              <Nav/>
            </Col>
          </Row>
          <Row>
            <Col className="main-content-area">
              {/*<div>// REDUX.
                <Button onClick={this.printHelloWorld1}>Click Me</Button>   
                <h3>Redux Example: </h3>{this.props.message}
              </div>*/}
              
              <Route path="/" exact component={Home} />
              <Route exact path="/Faculty" component={Facultypage} />
              <Route exact path="/Employee" component={Employee} /> 
              <Route exact path="/User" component={User} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Registration" component={Registration} />          
            </Col>
          </Row>
          <Row>
            <Col className="site-footer-section">
              <div className="site-footer">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
            </Col>
          </Row>
        </Container>        
      </div>
      </Router>      
    );
  }
 
}

/*const mapActionToProps={
  Callhello:printHelloWorld
}

const mapStateToProps=(state)=>{
  //console.log(${JSON.stringify(state.data)});
  return {message:state.data.message}
}*/

//export default connect(mapStateToProps,mapActionToProps)(App);
export default App;

