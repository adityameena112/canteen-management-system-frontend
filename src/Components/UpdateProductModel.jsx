import React, { Component } from 'react';
import { Modal }from 'react-bootstrap'

const UpdateProductModal = (props) => {

    const handlePrice = (e) => {
        props.onPrice(e)
    }

    const handleDescription = (e) => {
        props.onDescription(e)
    }

    const handleProductName = (e) => {
        props.onProductName(e)
    }

    const handleSelectedImage = (e) => {
        props.onSelectedImage(e)
    }

    const handleRemainingQuantity = (e) => {
        props.onRemainingQuantity(e)
    }

    return (<Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edit Product
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <form>
            <div className="form-group">
                <label for="productPrice">ID</label>
                <input disabled type="number" className="form-control" id="productPrice" placeholder="Price" value={props.id} />
            </div>
            <div className="form-group">
                <label for="productNameInput">Enter Product Name</label>
                <input required type="text" className="form-control" id="productNameInput" placeholder="Product Name" value={props.productName} onChange={handleProductName}  />
            </div>
            <div className="form-group">
                <label for="productPrice">Price</label>
                <input required type="number" className="form-control" id="productPrice" placeholder="Price" value={props.price} onChange={handlePrice}  />
            </div>
            <div className="form-group">
                <label for="productDescription">Description</label>
                <input required type="text" className="form-control" id="productDescription" placeholder="Description" value={props.description} onChange={handleDescription}  />
            </div>
            <div className="form-group">
                <label for="remainingQuantity">Remaining Stocks</label>
                <input required type="number" className="form-control" id="remainingQuantity" placeholder="Remaining Stocks" value={props.remainingQuantity} onChange={handleRemainingQuantity}  />
            </div>
            <div className="form-group">
                <label for="productImage">Image</label>
                <input required type="file" className="form-control" id="productImage" onChange={handleSelectedImage}  />
            </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-primary" onClick={props.onUpdate} >Update</button>
        </Modal.Footer>
    </Modal>)
  }

  export default UpdateProductModal