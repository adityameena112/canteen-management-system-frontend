import React, { Component } from 'react'
import CaruselComponent from './CaruselComponent'
import './home.css';

export default class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <h1 className="my-heading">Home</h1>
                <CaruselComponent />
            </div>
        )
    }
}
