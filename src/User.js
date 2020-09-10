import React, { Component, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { login } from './store/actions/login';
import validateInput from './Validation/user';
import PropTypes from 'prop-types';


class User extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid} = validateInput(this.state);
    if(!isValid){
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e){
    e.preventDefault();
    if(this.isValid()){
      console.log('Valid');
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => console.log("Success" + res),
        (err) =>  this.setState({ errors: err.data.errors, isLoading: false })
      );
    }
    else{
      console.log('INValid');
    }
  }

  onChange(e){
    this.setState({ [e.target.name] : e.target.value });
  }

  render(){
    const { email, password, errors, isLoading } = this.state;
    return(
      <div>
        <div className="registration-page">
          <h3>User Login</h3>
          <Row>        
            <Col>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" placeholder="Enter email Id" name="email" value={email} onChange={this.onChange} />
                  <span>{ errors.email }</span>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter First Name" name="password"  value={password} onChange={this.onChange} />
                  <span>{ errors.password }</span>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isLoading}>Login</Button>
              </Form>
            </Col>
            <Col>&nbsp;</Col>
        </Row>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  login: PropTypes.func.isRequired
}

User.contextType = {
  router: PropTypes.object.isRequired
}

export default connect(null, { login }) (User);