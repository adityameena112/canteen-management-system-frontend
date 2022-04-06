// import { Button } from "bootstrap";
import React, { Component } from "react";
import { Table } from 'react-bootstrap'
// import './admin-panel.css';
import Constant from "./Constant";
import { Spinner } from "react-bootstrap";
import { Button } from "@mui/material";
import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModel";
import './product.css'
import 'react-notifications/lib/notifications.css';
import { NotificationManager, NotificationContainer } from 'react-notifications' 

const axios = require('axios');



class Product extends Component {

    state = {
        id: '',
        products: [],
        productName: '',
        price: '',
        description: '',
        showModel: false,
        loader: true,
        showUpdateProductModel: false,
        product: {}
    }

    componentDidMount() {
        this.setState({ loader: true })
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
            this.setState({ products: res.data })
            this.setState({ loader: false })
        }).catch( (error) => {
            console.log(error);
            this.setState({ loader: false })
        })
    }

    addProduct = () => {
        axios.request({
            url: Constant.SAVE_PRODUCT,
            method: 'post',
            baseURL: Constant.BASE_URL,
            headers: {
                'content-type': 'application/json' ,
                'authorization': localStorage.getItem('token')
            },
            data: {
                productName: this.state.productName,
                price: this.state.price,
                description: this.state.description
            }
        }).then(res => {
            let p = this.state.products
            p.push(res.data)
            this.setState({ products: p })
            this.setState({ loader: false })
            NotificationManager.success("Product added Successfully!");
        }).catch( (error) => {
            console.log(error);
            NotificationManager.error("Product add failed!");
            this.setState({ loader: false })
        })
    }

    deleteProduct = (id) => {

        axios.request({
            url: Constant.DELETE_PRODUCT + "/" + id,
            method: 'get',
            baseURL: Constant.BASE_URL,
            headers: {
                'content-type': 'application/json' ,
                'authorization': localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ loader: false })
        }).catch( (error) => {
            console.log(error);
            this.setState({ loader: false })
        })
    }

    updateProduct = () => {
        axios.request({
            url: Constant.UPDATE_PRODUCT,
            method: 'post',
            baseURL: Constant.BASE_URL,
            headers: {
                'content-type': 'application/json' ,
                'authorization': localStorage.getItem('token')
            },
            data: {
                id: this.state.id,
                productName: this.state.productName,
                price: this.state.price,
                description: this.state.description
            }
        }).then(res => {
            let products = this.state.products
            products = products.map(product =>{
                if (res.data.id == product.id) {
                    return res.data
                }
                return product
            })
            this.setState({ products: products })
            this.setState({ loader: false })
            NotificationManager.success("Product updated Successfully!");
        }).catch( (error) => {
            NotificationManager.error("Product update failed!");
            console.log(error);
            this.setState({ loader: false })
        })
    }

    handleProductName = (e) => {
        this.setState({ productName: e.target.value })
    }

    handlePrice = (e) => {
        this.setState({ price: e.target.value })
    }

    handleDescription = (e) => {
        this.setState({ description: e.target.value })
    }

    onSave = () => {
        this.setState({ showModel: false })
        this.addProduct()
    }

    onUpdate = () => {
        this.setState({ showUpdateProductModel: false })
        this.updateProduct()
    }

    handleDelete = (id) => {
        let products = this.state.products.filter(p=>p.id != id);
        this.setState({ products });
        this.deleteProduct(id);
    }

    handleUpdateButton = (product) => {

        this.setState({ 
            id: product.id,
            productName: product.productName,
            price: product.price,
            description: product.description,
            showUpdateProductModel: true
        })
    }

  render() {

    if (this.state.loader) {
        return (
            <Spinner animation="border" role="status" style={{ margin: 'auto', marginTop: '19%' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>)
    }

    return (
        
      <div className={"product-container " + this.state.showModel ? "product-blue-effect" : ""}>
            { this.props.isStaff && 
            <button className="btn btn-primary product-add-button" onClick={() => this.setState({ showModel: true })}>Add Products</button>
            }
            { !this.props.isStaff &&
                <div className="">
                    <h1 className="my-heading">Products</h1>
                </div>
            }
            <Table striped bordered hover className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            { this.props.isStaff && <th>#</th> }
          </tr>
        </thead>
        <tbody>
          
          { this.state.products.map(p => (
            <tr key={p.id} >
                <td><img className="product-img" src={p.imageUrl} /></td>
                <td>{p.productName}</td>
                <td>{p.price} &#8377;</td>
                <td>{p.description}</td>
                {/* <button className="btn">Delete</button> */}
                { this.props.isStaff &&
                    <Button variant="contained" style={{ color: 'black' }} onClick={() => this.handleUpdateButton(p)} >Update</Button>
                }
                { this.props.isStaff &&    
                    <Button variant="outlined" color="error" onClick={() => this.handleDelete(p.id) }>Delete</Button>
                } 
            </tr>)) 
          }

        </tbody>
      </Table>

        <AddProductModal 
            show={this.state.showModel} 
            onProductName={(e) => this.handleProductName(e) } 
            onPrice={(e) => this.handlePrice(e)} 
            onDescription={(e) => this.handleDescription(e)}
            onHide={() => this.setState({ showModel: false })} 
            onSave={this.onSave}
            />

        <UpdateProductModal 
            show={this.state.showUpdateProductModel} 
            onHide={() => this.setState({ showUpdateProductModel: false })} 
            price={this.state.price}
            productName={this.state.productName}
            description={this.state.description}
            id={this.state.id}
            onProductName={(e) => this.handleProductName(e) } 
            onPrice={(e) => this.handlePrice(e)} 
            onDescription={(e) => this.handleDescription(e)}
            onUpdate={this.onUpdate}
        />
        <NotificationContainer/>

      </div>
    );
  }
}

export default Product;


