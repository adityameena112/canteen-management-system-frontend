import React, { Component } from 'react';
import './profile.css'
import { Form, Row, Col } from 'react-bootstrap';
import { Avatar } from '@mui/material';

class Profile extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: ''
    }

    componentDidMount() {
        const firstName = localStorage.getItem('firstName')
        const lastName = localStorage.getItem('lastName')
        const email = localStorage.getItem('login')
        this.setState({
            firstName,
            lastName,
            email
        })
    }

    render() {
        return (
            <div className="profile-container">
                <h2 className="profile-heading">Profile</h2>

            <div className="profile-form-container">
                {/* <Form> */}

                <Avatar
                    alt="Remy Sharp"
                    sx={{ width: 100, height: 100 }}
                    className="avatar-font"
                >
                    AA
                </Avatar>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Row>
                        <Col>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={this.state.firstName} />
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={this.state.lastName} />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={this.state.email} />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group> */}

            {/* </Form> */}
            </div>

            </div>
        );
    }
}

export default Profile;