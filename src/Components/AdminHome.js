import React, { Component } from "react";
import './admin-panel.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Constant from "./Constant";
import { Spinner } from "react-bootstrap";


const axios = require('axios');
ChartJS.register(ArcElement, Tooltip, Legend);

class AdminHome extends Component {

    componentDidMount() {
      this.setState({ loader: true })
      this.fetchSalesData()
    }

    state = {
      data: [],
      label: [],
      borderColor: [],
      backgroundColor: [],
      loader: false
    }
    
    fetchSalesData = () => {

      axios.request({
          url: Constant.GET_PRODUCT_SALES,
          method: 'get',
          baseURL: Constant.BASE_URL,
          headers: {
              'content-type': 'application/json' ,
              'authorization': localStorage.getItem('token')
          }
      }).then(res => {
          const label = res.data.map(x => x.productName)
          const data = res.data.map(x => x.sales)

          const backgroundColor = res.data.map(x => {
            const r = Math.floor(Math.random() * 256)
            const g = Math.floor(Math.random() * 256)
            const b = Math.floor(Math.random() * 256)
            return `rgba(${r}, ${g}, ${b}, 0.2)`
          })
          const borderColor = res.data.map(x => {
            const r = Math.floor(Math.random() * 256)
            const g = Math.floor(Math.random() * 256)
            const b = Math.floor(Math.random() * 256)
            return `rgba(${r}, ${g}, ${b}, 0.2)`
          })

          console.log(backgroundColor);
          console.log(borderColor);

          this.setState({ label, data, borderColor, backgroundColor })
          this.setState({ loader: false })
      }).catch( (error) => {
          console.log(error);
          this.setState({ loader: false })
      })
    }

  data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  getDataSet = () => {
    return {
      labels: this.state.label,
      datasets: [
        {
          label: "# sales",
          data: this.state.data,
          backgroundColor: this.state.backgroundColor,
          borderColor: this.state.borderColor,
          borderWidth: 1
        }
      ]
    }
  }

  render() {

    if (this.state.loader) {
      return (
          <Spinner animation="border" role="status" style={{ margin: 'auto', marginTop: '19%', color: "white" }}>
              <span className="visually-hidden">Loading...</span>
          </Spinner>)
    }

    return (
      <div className="admin-dashboard">
        <h2>Product Sales</h2>
        <Pie data={this.getDataSet()} borderWidth={2} className="admin-dashboard" />
      </div>
    );
  }
}

export default AdminHome;
