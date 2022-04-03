import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import './orders.css'
import Constant from './Constant';
import UpdateOrderStatusModel from './UpdateOrderStatusModel';


const axios = require('axios');

class Orders extends Component {


    state = {
        orders: [],
        showStatusModal: false,
        products: [],
        orderStatus: [],
        orderId: null
    }
    
    componentDidMount() {
        this.setState({ loader: false })
        this.fetchOrders()
        this.fetchOrderStatus()
    }



    fetchOrders = () => {
        axios.request({
            url: Constant.GET_ALL_ORDERS,
            method: 'get',
            baseURL: Constant.BASE_URL,
            headers: {
                'content-type': 'application/json' ,
                'authorization': localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ orders: res.data })
            this.setState({ loader: false })
        }).catch( (error) => {
            console.log(error);
            this.setState({ loader: false })
        })
    }

    fetchOrderStatus = () => {
        axios.request({
            url: Constant.GET_ORDER_STATUS,
            method: 'get',
            baseURL: Constant.BASE_URL,
            headers: {
                'content-type': 'application/json' ,
                'authorization': localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ orderStatus: res.data })
            this.setState({ loader: false })
        }).catch( (error) => {
            console.log(error);
            this.setState({ loader: false })
        })
    }
    
    getTotalPrice = (products) => {
        if (products.length == 0) return 0
        return products.map(product=>product.totalPrice).reduce((prev, next) => prev + next, 0)
    }

    handleUpdateButton = (products, orderId) => {
        this.setState({ products, orderId })
        this.setState({ showStatusModal: true })
    }

    updateStatus = () => {
        this.setState({ showStatusModal: false })
        this.fetchOrders()
    }

    getOrderName = (order) => {
        const orderName = order.products.length != 0 ? order.products.map(x=>x.product.productName).reduce((previousValue, currentValue) => {
            if (previousValue == '')
                return currentValue
            return previousValue + "," + currentValue
        }, '') : 'No Products'
        return orderName
    }
    
    render() {
        return (
            <div className="orders-container">
                <h2 className="orders-heading">Orders</h2>
                <Table hover size="sm" borderless className="orders-table">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Order Name</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                        <th>Order By</th>
                        <th>Grand Total</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.orders.map((order, index)=>{


                            return (
                                <tr key={order.id.toString()}>
                                    <td>{index + 1}</td>
                                    <td>{ this.getOrderName(order) }</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.orderBy.firstName + " " + order.orderBy.lastName}</td>
                                    <td>{this.getTotalPrice(order.products)} &#8377;</td>
                                    <td>
                                        <button className="btn btn-primary update-button" disabled={order.orderStatus == 'COMPLETED'} onClick={() => this.handleUpdateButton(order.products, order.id)}>Update Status</button>
                                    </td>
                                </tr>
                                )
                        })}
                        
                    </tbody>
                </Table>
                <UpdateOrderStatusModel 
                    show={this.state.showStatusModal} 
                    onHide={() => this.setState({ showStatusModal: false })} 
                    products={this.state.products}
                    orderStatus={this.state.orderStatus}
                    totalPrice={this.getTotalPrice(this.state.products)}
                    orderId={this.state.orderId}
                    updateStatus={this.updateStatus}
                />
            </div>
        );
    }
}

export default Orders;