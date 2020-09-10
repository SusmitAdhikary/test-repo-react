import React, { Component, useState } from "react";
import { withRouter } from 'react-router-dom';
//import { browserHistory } from 'react-router';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Row, Col, Container, Form, Button, Toast } from 'react-bootstrap';
import DataService from "./Service";


class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      errors: {
        fname: '',
        lname: '',
        email: '',
        password: '',
      },
      show: false
    };
  }
  
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const validEmailRegex = 
    RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    let errors = this.state.errors;
    
    switch (name) {
      case 'fname': 
        errors.fname = 
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
        case 'lname': 
        errors.lname = 
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }
  
    this.setState({errors, [name]: value}, ()=> {
        //console.log(errors)
    })
  }
  
  
  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
  
  setShow =(status) => {
    this.setState({
      show: false
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    const { name, value } = event.target;
    let errors = this.state.errors;
    let fields = this.state;

    if (!fields["fname"]) {
      errors.fname = "First name Cannot be empty";
    }    
    if (!fields["lname"]) {
      errors.lname = "Last name Cannot be empty";
    }    
    if (!fields["email"]) {
      errors.email = "E-mail Cannot be empty";
    }    
    if (!fields["password"]) {
      errors.password = "Password Cannot be empty";
    }
    this.setState({errors});
    
    if(this.validateForm(this.state.errors)) {
      console.info('Valid Form');
      DataService.signup(this.state)
        .then(res=>{
          if (res.data == "success") {
            console.log('Result =' + res.data);
            this.setState({show: true});
            this.setState({
              fame: '',
              lname: '',
              email: '',
              password: ''
            });
            //event.target.reset();
            //this.props.history.push('/login');
          }        
        });
    }
    else{
      console.error('Invalid Form');
    }    
  }
  

  render() {
    const { isLoading, users, show, setShow } = this.state;
    let userListNew = null;
    let button = null;

    return (
      <div>
        <div className="registration-page">
          <h3>User Registration</h3>
          <Toast onClose={() => this.setShow(false)} show={show}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
              <strong className="mr-auto">Hi, there</strong>
            </Toast.Header>
            <Toast.Body>You're successfully registered! Please click <a href="/login">Login</a> link to sign in!</Toast.Body>
          </Toast>
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control type="text" placeholder="Enter First Name" name="fname" onChange={this.handleChange} />
                  <span style={{color: "red"}}>{this.state.errors["fname"]}</span>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control type="text" placeholder="Enter Last Name" name="lname" onChange={this.handleChange} />
                  <span style={{color: "red"}}>{this.state.errors["lname"]}</span>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address:</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange} />
                  <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                  <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                </Form.Group>
                <Button variant="primary" type="submit">
                Registaration
                </Button>
              </Form>
            </Col>
            <Col>
              <div>
                <h4>Registaration Procedure :</h4>
                <p>
                  <ul>
                    <li>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                    <li>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                    <li>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                    <li>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</li>
                  </ul>
                </p>
              </div>
            </Col>
          </Row>
          
        </div>
      </div>
    );
  }
}



export default Registration;