import React, {useState} from "react";
import QrReader from 'react-qr-reader';
// import QrReader from 'react-qr-scanner'
import {Button, Modal} from "react-bootstrap";
import {FaQrcode} from "react-icons/fa";

const QrCodeReader = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <Button variant="secondary" onClick={handleShow}><FaQrcode/> Scan QR Code</Button>

      <Modal dir="rtl" show={show}
             centered
             onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>QR Code Scanner</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <QrReader
            delay={500}
            onError={(err) => props.handleError(err)}
            onScan={(data) => props.handleScan(data)}
            style={{width: '100%'}}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
};

export default QrCodeReader;
