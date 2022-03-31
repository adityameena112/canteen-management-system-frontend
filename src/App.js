import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Components/NavbarComp';
import React, { Component } from 'react'

class App extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div className="App" style={this.styles}>
        
        <NavbarComp />
  
      </div>
    );
  }
}

export default App;
