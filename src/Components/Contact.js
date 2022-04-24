import React, { Component } from 'react'
import './contact.css'
import { Form, Button } from 'react-bootstrap';
import { NotificationContainer } from 'react-notifications';
import { Divider } from '@mui/material';

export default class Contact extends Component {
    render() {
        return (
            <div>
                <h2 style={{ marginTop: '1%' }}>Contact Us</h2>

                <h4>Email: teampranzo19@gmail.com</h4>

                <Divider style={{ marginTop: '2%', backgroundColor: 'white', marginBottom: '2%' }} />

                <h3>Leave a message</h3>
                    <div className="contact-form-container">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control type="text" placeholder="message" />
                    </Form.Group>

                    <Button variant="primary" type="button">
                        Submit
                    </Button>
                    </div>
                    <NotificationContainer />
            
            </div>
        )
    }
}
