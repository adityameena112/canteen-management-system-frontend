import React, { Component } from "react";
import { Table } from 'react-bootstrap'
import './admin-panel.css';
const axios = require('axios');

class AdminHome extends Component {

    componentDidMount() {
        this.fetchProducts()
    }

    fetchProducts = () => {

        axios.get('http://localhost:8080/api/product/get-all')
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });

    }

  render() {
    return (
      <div className="product-table">
          <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
      </div>
    );
  }
}

export default AdminHome;
