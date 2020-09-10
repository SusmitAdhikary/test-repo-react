import React, { Component } from "react";
import { connect } from 'react-redux';
//import { browserHistory } from 'react-router';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { useHistory } from "react-router-dom";
import Title from './Title';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { login, register } from './store/actions/login';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
      isUser: ''
    }   
    
  }

  state = {
    users: [
      { userName: '', userMail: '', imageUrl: '', button: 'Login' },
    ],
    email: '',
    password: '',
    isLoad: true,
    isLoading: true,
    carsList: []
  }  

  emailHandleChange = event => {
    this.setState({ email: event.target.value });
  }

  passwordHandleChange = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login({...loginData});
    
    /*
    axios.post('http://localhost:4000/signin', { email: this.state.email, password: this.state.password })
     .then(res=>{
        console.log(res.data.results);
        if (res.data.results == "not a user") {
          console.log("not a user");        
        } 
        else {
          //console.log(res.data.token);
          const token = res.data.token;
          const {first_name,id} = JSON.parse(JSON.parse(atob(token.split('.')[1])).data)[0];
          //console.log("F Name=" + first_name);
          //console.log("ID=" + id);
          localStorage.setItem('token',token);
          localStorage.setItem('first_name',first_name);
          localStorage.setItem('expiryDate',Date.now()+3600000);
          this.props.history.push('/');
        }        
      })*/
  }  

  render() {
    const { isLoading, users } = this.state;
    let userListNew = null;
    let button = null;    
    return (
      <div>
        <div className="registration-page">
          <h3>User Login</h3>
          <Row>        
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" placeholder="Enter email Id" name="email" onChange={this.emailHandleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter First Name" name="password" onChange={this.passwordHandleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
              </Form>
            </Col>
            <Col>&nbsp;</Col>
        </Row>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
      auth: state.isSignedIn,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      login: (data) => dispatch(login(data))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);