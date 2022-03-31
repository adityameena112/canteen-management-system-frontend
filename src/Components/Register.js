import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import './register.css';
import Constant from "./Constant";
import 'react-notifications/lib/notifications.css';
import { NotificationManager, NotificationContainer } from 'react-notifications' 

const axios = require('axios');

class Register extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  handleInput = (e, key) => {
    switch (key) {
      case "firstName":
        this.setState({ firstName: e.target.value })
        break;
      case "lastName":
        this.setState({ lastName: e.target.value })
        break;

      case "email":
        this.setState({ email: e.target.value })
        break;

      case "password":
      this.setState({ password: e.target.value })
      break;

      default:
        break;
    }
  }

  validateInput = () => {
    const { email, firstName, lastName, password } = this.state
    if (email.trim().length == 0 || 
      firstName.trim().length == 0 || 
      lastName.trim().length == 0 || 
      password.trim().length == 0) {
        return false
    }
    return true
  }

  handleRegister = () => {

    console.log(Constant.BASE_URL);
    console.log(Constant.REGISTER_USER);

    axios({
      url: '/api/register'  ,
      method: 'post',
      baseURL: Constant.BASE_URL,
      headers: {
          'content-type': 'application/json' 
          // 'authorization': localStorage.getItem('token')
      },
      data: {
        login: this.state.email,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
        langKey: 'en'
      }
    })
    .then( (response) => {
        // handle success
        NotificationManager.success("Registration Successfully ");
        // this.setState({ loader: false })
        window.open("http://localhost:3000/", '_self')
    })
    .catch( (error) => {
        NotificationManager.error(error.response.data.message);
        // handle error
        // this.setState({ loader: false })
        console.log(error);
    })
  }

  render() {
    return (
      <Form className="form-layout register-layout">

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={(e) => this.handleInput(e, "firstName")} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label> Last Name</Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={(e) => this.handleInput(e, "lastName")} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => this.handleInput(e, "email")} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => this.handleInput(e, "password")} />
        </Form.Group>
        
        <Button variant="primary" type="button" onClick={this.handleRegister} disabled={!this.validateInput()}>
          Submit
        </Button>
        <NotificationContainer />
      </Form>
    );
  }
}

export default Register;
