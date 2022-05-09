import React, { useState } from 'react';
import { Modal, Table, Form }from 'react-bootstrap'
import Constant from './Constant';

const axios = require('axios');

const UpdateOrderStatusModel = (props) => {

    const [status, setStatus] = useState('')

    const handleChange = (e) => {
        setStatus(e.target.value)
    }

    const handleUpdate = () => {
        axios.request({
            url: Constant.UPDATE_ORDER_STATUS + "/" + props.orderId + "/" + status,
            method: 'get',
            baseURL: Constant.BASE_URL,
            headers: {
                'content-type': 'application/json' ,
                'authorization': localStorage.getItem('token')
            }
        }).then(res => {
            props.updateStatus()
            // this.setState({ orderStatus: res.data })
            // this.setState({ loader: false })
        }).catch( (error) => {
            console.log(error);
            // this.setState({ loader: false })
        })
    }

    return (<Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Update Order Status
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Table hover size="sm" borderless className="orders-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    { props.products.map((product, index)=>{
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{product.product.productName}</td>
                                <td>{product.quantity}</td>
                                <td>{product.product.price}</td>
                                <td>{product.totalPrice}</td>
                            </tr>
                        )
                    }) }
                </tbody>
            </Table>
            
            <form>

                <div className="form-group">
                    <label for="productPrice">Grand Total</label>
                    <input disabled type="number" className="form-control" id="productPrice" placeholder="Price" value={props.totalPrice} />
                </div>
                
                <Form.Select aria-label="Default select example" style={{ marginTop: '2%' }} onChange={handleChange}>
                    { props.orderStatus.map(status=>(
                        <option value={status}>{status}</option>
                    )) }
                </Form.Select>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-primary" disabled={status === ''} onClick={handleUpdate}>Update</button>
        </Modal.Footer>
    </Modal>)
  }

  export default UpdateOrderStatusModel