import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import './login.css'
import Constant from "./Constant";
import { Spinner } from "react-bootstrap";
import 'react-notifications/lib/notifications.css';
import { NotificationManager, NotificationContainer } from 'react-notifications' 


const axios = require('axios');

class Login extends Component {

    state = {
        email: '',
        password: '',
        loader: false
    }

    componentDidMount() {
        console.log(this.props.checkAuthenticatedUser);
    }

    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handleLogin = () => {

      this.setState({ loader: true })

        axios.post('http://localhost:8080/api/authenticate', {
            username: this.state.email,
            password: this.state.password
        })
        .then( (response) => {
            // handle success
            localStorage.setItem("token", "Bearer " + response.data.id_token)
            
            this.fetchUserInfo()
            this.props.checkAuthenticatedUser()
            NotificationManager.success("Login Successfully ");
            this.setState({ loader: false })
            window.open("http://localhost:3000/", '_self')
        })
        .catch( (error) => {
            // handle error
            this.setState({ loader: false })
            NotificationManager.error(error.response.data.detail);
            console.log(error);
        })

    }

    fetchUserInfo = () => {
      axios.request({
        url: Constant.ACCOUNT_INFO,
        method: 'get',
        baseURL: Constant.BASE_URL,
        headers: {
            'content-type': 'application/json' ,
            'authorization': localStorage.getItem('token')
        }
      }).then((res) => {
          console.log(res.data);

          const { login, firstName, lastName } = res.data

          localStorage.setItem("login", login)
          localStorage.setItem("firstName", firstName)
          localStorage.setItem("lastName", lastName)
          const role = res.data.authorities.includes('ROLE_ADMIN') ? "ADMIN" : res.data.authorities.includes('ROLE_STAFF') ? "STAFF" : "USER"
          localStorage.setItem("role", role)
          // this.setState({ loader: false })
      }).catch( (error) => {
          // NotificationManager.error(error.response.data.message);
          console.log(error);
          // this.setState({ loader: false })
      })
    }

  render() {

    if (this.state.loader) {
      return (
          <Spinner animation="border" role="status" style={{ margin: 'auto', marginTop: '19%', color: "white" }}>
              <span className="visually-hidden">Loading...</span>
          </Spinner>)
    }

    return (
        <Form className="form-layout" >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmail} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={this.handlePassword} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="button" onClick={this.handleLogin}>
            Login
          </Button>
          <NotificationContainer />
        </Form>
      );
  }
}

export default Login;
