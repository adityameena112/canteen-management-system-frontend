import React, { Component } from 'react'
// import { Table } from 'react-bootstrap'
import './myorder.css'
import Row from './Row';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Constant from './Constant';
import MakeOrderModal from './MakeOrderModal';

const axios = require('axios');

class MyOrders extends Component {

    createData(orderName, orderStatus, orderDate, products, total) {
        return {
            orderName,
            orderStatus,
            orderDate,
            total,
            products
        };
    }

    componentDidMount() {
        this.fetchOrders()
    }

    state = {
        orders: [],
        showModal: false
    }

    fetchOrders = () => {
        axios.request({
            url: Constant.GET_USER_ORDERS,
            method: 'get',
            baseURL: Constant.BASE_URL,
            headers: {
                'content-type': 'application/json' ,
                'authorization': localStorage.getItem('token')
            }
        }).then(res => {

            const orders = res.data.map(order => {
                const orderName = order.products.length != 0 ? order.products.map(x=>x.product.productName).reduce((previousValue, currentValue) => {
                    if (previousValue == '')
                        return currentValue
                    return previousValue + "," + currentValue
                }, '') : 'No Products'
                order.orderName = orderName

                const total = order.products.length != 0 ? order.products.map(x=>x.totalPrice).reduce((previousValue, currentValue) => previousValue + currentValue , 0) : 0
                order.total = total
                return order;
            })

            this.setState({ orders: orders })
            // this.setState({ loader: false })
        }).catch(function (error) {
            console.log(error);
            // this.setState({ loader: false })
        })
    } 

    hideModal = () => {
        this.setState({ showModal: false })
    }


    updateOrders = () => {
        this.fetchOrders()
    }
    
    render() {
        return (
            <div className="my-order align-items-center p-3 my-3 text-black bg-purple rounded shadow-sm" >

                <div className="my-order-heading">
                    <h1 className="my-heading">My orders</h1>
                </div>

                <br />

                <div className='my-orders-table'>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell className="order-table-heading" >Order Name</TableCell>
                                <TableCell className="order-table-heading" align="right">Order Status</TableCell>
                                <TableCell className="order-table-heading" align="right">Order Date</TableCell>
                                <TableCell className="order-table-heading" align="right">Total</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.orders.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <button className="btn btn-primary mt-4" onClick={() => this.setState({ showModal: true })}>Make new Order</button>

                <MakeOrderModal 
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })} 
                    updateOrders={this.updateOrders}
                    hideModal={this.hideModal}
                />
                

            </div>

            

        );
    }
}

export default MyOrders;