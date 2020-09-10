import React, { Component } from "react";
//import { browserHistory } from 'react-router';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { useHistory } from "react-router-dom";
import Title from './Title';


class Login extends Component {
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

  handleSubmit = event => {
    event.preventDefault();

    axios.post('http://localhost:1337/signin', { email: this.state.email, password: this.state.password })
     .then(res=>{
        console.log(res);
        console.log(res.data.token);
        const {token} = res.data.token;
        //const {first_name} = res.data.data[0];
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('expiryDate',Date.now()+3600000);
      })
  }

  responseGoogle=(response)=>{
    console.log(response);
    this.setState( {
      users: [
        { userName: response.profileObj.name, userMail: response.profileObj.email, imageUrl: response.profileObj.imageUrl, button:'Logout' },
      ]
    } )
  
  }

  render() {
    const { isLoading, users } = this.state;
    let userListNew = null;
    let button = null;
    button = (
      <div className="text-left">
        <React.Fragment>
          { isLoading ? (
            users.map(user => {
              return (
                <span>{user.button}</span>
              );
            })
          ) : (
            <h3>Loading...</h3>
          )}
        </React.Fragment>
      </div>
    );

    userListNew = (
      <div className="text-left">
        <React.Fragment>
          { isLoading ? (
            users.map(user => {
              return (
                <div key={user.userMail} className="emp-wrap">
                  <p><b>User Name:</b> {user.userName}</p>
                  <p><b>Email Address:</b> {user.userMail}</p>
                  <p><b>Photo :</b> <img src={user.imageUrl} /></p>
                </div>
              );
            })
          ) : (
            <h3>Loading...</h3>
          )}
        </React.Fragment>
      </div>
    );
    return (
      <div>
        <div>
          <span><Title>{"title"}</Title></span>
          <form onSubmit={this.handleSubmit}>
            <p>
              <label>
                Email:
                <input type="text" name="email" onChange={this.emailHandleChange} />
              </label>
            </p>
            <p>
              <label>
                Password:
                <input type="password" name="password" onChange={this.passwordHandleChange} />
              </label>
            </p>
            <p>
              <button type="submit">Log In</button>
            </p>
          </form>
        </div>
        <div>
          <GoogleLogin
            clientId="938647843228-5oio5n10cggmq8fetku8thecfh0pqpqn.apps.googleusercontent.com"
            buttonText={button}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div> 
        <h1>:: Display using Google API Call ::</h1>
            { userListNew }  
      </div>
    );
  }
}



export default Login;