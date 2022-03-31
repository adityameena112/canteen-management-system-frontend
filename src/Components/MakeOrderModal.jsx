import React, { Component } from 'react';
import { Modal }from 'react-bootstrap'
import { Form } from 'react-bootstrap';
import Constant from './Constant';
import { Table, Badge } from 'react-bootstrap';
import { Divider } from '@mui/material';


const axios = require('axios');

class MakeOrderModal extends Component {

    state = {
        selectedProduct: 'No Selected',
        products: [],
        grandTotal: 0
    }

    componentDidMount() {
        this.fetchProducts()
    }

    fetchProducts = () => {
        axios.request({
            url: Constant.GET_ALL_PRODUCT,
            method: 'get',
            baseURL: Constant.BASE_URL,
            headers: {
                'content-type': 'application/json' ,
                'authorization': localStorage.getItem('token')
            }
        }).then(res => {
            console.log(res.data);
            const products = res.data.map(product=>{
                return {
                    quantity: 0,
                    totalPrice: 0,
                    product: product
                }
            })
            this.setState({ products: products })
            // this.setState({ loader: false })
        }).catch(function (error) {
            console.log(error);
            // this.setState({ loader: false })
        })
    }


    makeOrder = () => {

        const products =  this.state.products.filter(product => product.quantity > 0)

        axios.request({
            url: Constant.MAKE_USER_ORDER,
            method: 'post',
            baseURL: Constant.BASE_URL,
            headers: {
                'content-type': 'application/json' ,
                'authorization': localStorage.getItem('token')
            },
            data: {
                products: products
            }
        }).then(res => {
            this.props.updateOrders()
            // this.setState({ orders: orders })
            // this.setState({ loader: false })
        }).catch(function (error) {
            console.log(error);
            // this.setState({ loader: false })
        })
        
        this.props.hideModal()

    }

    handleIncrement = (p) => {
        const products = this.state.products.map(product => {
            if (p.product.id == product.product.id) {
                product.quantity = product.quantity + 1
                product.totalPrice = product.quantity * product.product.price
            }
            return product;
        })

        const grandTotal = products.map(product=>product.totalPrice).reduce((previousValue, currentValue) => previousValue + currentValue, 0)

        this.setState({ products, grandTotal });
    }

    handleDecrement = (p) => {
        const products = this.state.products.map(product => {
            if (p.product.id == product.product.id) {
                product.quantity = product.quantity - 1
                product.totalPrice = product.quantity * product.product.price
            }
            return product;
        })
        const grandTotal = products.map(product=>product.totalPrice).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
        this.setState({ products, grandTotal });
    }

    render() {
        return (<Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Make Order
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Table striped hover borderless>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map((product, index)=>(
                        <tr key={product.product.id}>
                            <td>{index + 1}</td>
                            <td>{product.product.productName}</td>
                            <td>{product.quantity}</td>
                            <td>{product.product.price}</td>
                            <td>{product.totalPrice}</td>
                            <td>
                                <button onClick={() => this.handleIncrement(product) } className="btn btn-primary">+</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => this.handleDecrement(product)} disabled={product.quantity == 0} >-</button>
                            </td>
                        </tr>
                    ))}
                    
                    <Divider />

                    <tr key={this.state.products.length + 2}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Grand Total</td>
                        <td>:</td>
                        <td>{this.state.grandTotal}</td>
                    </tr>

                </tbody>
                </Table>

                {/* <Badge bg="primary">Primary</Badge> */}
                
                
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" disabled={this.state.products.filter(product => product.quantity > 0).length == 0 } onClick={this.makeOrder} >Order</button>
            </Modal.Footer>
        </Modal>)
    }
  }

  export default MakeOrderModal