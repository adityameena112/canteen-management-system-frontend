import React, { Component } from 'react'
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import Home from './Home';
import Contact from './Contact';
import About from './About'
import Login from './Login';
import Register from './Register';
import Product from './Product';
import Avatar from '@mui/material/Avatar'
import MyOrders from './MyOrders';
import { Menu, MenuItem } from '@mui/material';
import { IconButton } from '@mui/material';
import MenuButtonComponent from './MenuButtonComponent';
import Orders from './Orders';
import Profile from './Profile'
import AdminHome from './AdminHome'

export default class NavbarComp extends Component {

    componentDidMount() {
        
    }

    state = {
        authenticated: false,
        isStaff: false,
        anchorEl: null,
        
    }

    open = Boolean(this.state.anchorEl)

    componentDidMount() {
        this.checkAuthenticatedUser()
    }

    checkAuthenticatedUser = () => {
        const token = localStorage.getItem('token');
        if (token != null) this.setState({ authenticated: true, isStaff: localStorage.getItem('role') == 'STAFF' })
    }

    isAuthenticated = () => {
        return this.state.authenticated
    }

    handleLogout = () => {
        
        localStorage.removeItem("token")
        localStorage.removeItem("firstName")
        localStorage.removeItem("lastName")
        localStorage.removeItem("login")
        this.checkAuthenticatedUser()
        window.open("http://localhost:3000/", '_self')
    }

    handleMenuClose = () => {
        this.setState({ anchorEl: null })
    }

    handleMenuOpen = (e) => {
        this.setState({ anchorEl: e.currentTarget });
    }

    getAvatarName = () => {
        const a = localStorage.getItem("firstName")?.toUpperCase().charAt(0)
        const b = localStorage.getItem("lastName")?.toUpperCase().charAt(0)
        return a == null || b == null ? 'A' : a + b
    }

    render() {
        return (
            <Router>
                <div>

                    <Navbar bg="dark" variant={"dark"} expand="lg">
                        <Navbar.Brand href="#">Canteen Management System</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                { !this.state.authenticated && <Nav.Link as={Link} to="/login">Login</Nav.Link> }
                                { !this.state.authenticated && <Nav.Link as={Link} to="/register">Register</Nav.Link> }
                                { this.state.authenticated && <Nav.Link as={Link} to="/products">Products</Nav.Link> }
                                { (this.state.authenticated && this.state.isStaff ) && <Nav.Link as={Link} to="/orders">Orders</Nav.Link> }
                                { (this.state.authenticated && !this.state.isStaff ) && <Nav.Link as={Link} to="/myorders">My Orders</Nav.Link> }
                                <Nav.Link as={Link} to="/about">About</Nav.Link>
                                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                                {/* { this.state.authenticated && <button className="btn btn-dark" onClick={this.handleLogout}>Logout</button> } */}
                                
                            </Nav>

                        </Navbar.Collapse>
                        { this.state.authenticated && 
                            <MenuButtonComponent avatarName={this.getAvatarName} handleLogout={this.handleLogout} />
                        }


                    </Navbar>
                </div>
                <div>
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login"  
                            render={(props) => <Login checkAuthenticatedUser={this.checkAuthenticatedUser} {...props} />}
                        />
                        <Route path="/products"
                            render={(props) => <Product isStaff={this.state.isStaff} {...props} />}
                        />
                        <Route path="/myorders">
                            <MyOrders />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/orders">
                            <Orders />
                        </Route>
                        <Route path="/admin">
                            <AdminHome />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                        
                        <Redirect to="/" />
                    </Switch>
                </div>
            </Router>
        )
    }
}
