import React, { Component } from 'react';
import { Modal }from 'react-bootstrap'
import Constant from './Constant';
import { Table, Badge } from 'react-bootstrap';
import { Divider, FormControl, InputLabel, Select, MenuItem, Input, Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './payment.css'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const axios = require('axios');

class MakeOrderModal extends Component {

    state = {
        selectedProduct: 'No Selected',
        products: [],
        grandTotal: 0,
        isPaymentPage: false,
        paymentType: '',
        upi: '',
        cardExpireDate: null
    }

    componentDidMount() {
        this.fetchProducts()
    }

    onCancel = () => {
        this.setState({ isPaymentPage: false })
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
                    product: product,
                    remainingQuantity: product.remainingQuantity ? product.remainingQuantity : 0
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
                products: products,
                paymentType: this.state.paymentType
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
                product.remainingQuantity = product.remainingQuantity - 1
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
                product.remainingQuantity = product.remainingQuantity + 1
            }
            return product;
        })
        const grandTotal = products.map(product=>product.totalPrice).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
        this.setState({ products, grandTotal });
    }

    handlePaymentTypeChange = (e) => {
        this.setState({ paymentType: e.target.value })
    }

    handleUpiPayment = (e) => {
        this.setState({ upi: e.target.value })
    }

    handleCardExpireDate = (e) => {
        this.setState({ cardExpireDate: e })
    }

    render() {

        if (this.state.isPaymentPage)
            return this.paymentModal();

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
                        <th>Remaining Quantity</th>
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
                            <td>{product.remainingQuantity}</td>
                            <td>
                                <button onClick={() => this.handleIncrement(product) } disabled={product.remainingQuantity === 0} className="btn btn-primary">+</button>
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
                <button className="btn btn-primary" disabled={this.state.products.filter(product => product.quantity > 0).length == 0 } onClick={() => this.setState({ isPaymentPage: true })} >Order</button>
            </Modal.Footer>
        </Modal>)
    }

    paymentModal = () => {
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton> 
                    <Modal.Title id="contained-modal-title-vcenter">
                        Make Payment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="payment-container">
                        <div className="payment-details-container">
                            <p>Grand Total: {this.state.grandTotal} </p>
                            
                        </div>
                        <div className="order-details-container">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Payment Type</InputLabel>
                                
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.paymentType}
                                    label="Payment Type"
                                    onChange={this.handlePaymentTypeChange}
                                >
                                    <MenuItem value={'CASH'}>Cash</MenuItem>
                                    <MenuItem value={'CREDIT_CARD'}>Credit Card</MenuItem>
                                    <MenuItem value={'DEBIT_CARD'}>Debit Card</MenuItem>
                                    <MenuItem value={'UPI'}>UPI</MenuItem>
                                </Select>

                            </FormControl>  
                            { this.state.paymentType === 'UPI' && 
                            <Box mt={2}>
                                <Input placeholder='Enter UPI ID' onChange={this.handleUpiPayment} value={this.state.upi} />    
                            </Box>  
                            }
                            { (this.state.paymentType === 'CREDIT_CARD' || this.state.paymentType === 'DEBIT_CARD') && 
                            <Box mt={2} style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>

                                <Input style={{ width: '70%', marginRight: '5%' }} placeholder='Enter Card Number' onChange={this.handleUpiPayment} value={this.state.upi} /> 
                                <LocalizationProvider dateAdapter={AdapterDateFns} style={{ width: '45%' }}>
                                    <DatePicker
                                        inputFormat="yyyy-MM"
                                        label="Expire Date"
                                        views={['year', 'month']}
                                        minDate={new Date()}
                                        value={this.state.cardExpireDate}
                                        onChange={this.handleCardExpireDate}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                        />
                                </LocalizationProvider>
                            </Box>
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={this.onCancel} >Cancel</button>
                    <button className="btn btn-primary" onClick={this.makeOrder} >Make Payment</button>
                </Modal.Footer>
            </Modal>
        );
    }

}

  export default MakeOrderModal