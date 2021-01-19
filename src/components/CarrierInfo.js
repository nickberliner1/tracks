import React, { useState } from 'react';
import './carrier-info.css';

import { 
    Button, 
    Modal, 
} from 'react-bootstrap';

const CarrierInfo = (props) => {
    // const [show, setShow] = useState(true);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <div className="carrier-container">
        {/* <Button variant="primary" onClick={handleShow}>
            Launch demo modal
        </Button> */}
<h1>{props.id}</h1>
        {/* <Modal 
         style={{opacity:1, display: 'block'}}
         fade={false}
            // show={show} onHide={handleClose}
        >
            <\
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer> */}
            {/* <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button> 
            </Modal.Footer>
        </Modal> */}
        </div>
    );
};

export default CarrierInfo;