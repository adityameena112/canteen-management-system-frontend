import { React } from 'react';
import { Modal } from 'react-bootstrap';
import './payment.css';

export default function PaymentModal(props) {
    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Make Payment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="payment-container">

            <img src='https://i.postimg.cc/6QdFnb41/Whats-App-Image-2022-04-17-at-10-57-54-AM.jpg' border='0' alt='Whats-App-Image-2022-04-17-at-10-57-54-AM'/>

            <h4>Kindly scan this QRCode to make payment</h4>

            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={props.onClose} >Close</button>
            </Modal.Footer>
        </Modal>

    );
}