import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import SweetAlert from 'react-bootstrap-sweetalert';

import myAPI from '../Api';
import '../admin/assets/css/mystyle.css';

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [alertShow, setAlertShow] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const closeAlert = () => setAlertShow(false);

  const onLogin = async() => {
    if (userEmail === '') {
      setAlertShow(true);
      setMessage('Please enter the email.');
    }
    else if (userPassword === '') {
      setAlertShow(true);
      setMessage('Please enter the password');
    }
    else {
      setLoading(true);
      try {
        await myAPI.loginUser({
          email: userEmail,
          password: userPassword
        }).then(response => {
          setAlertShow(true);
          if (response.data.success)
            setMessage('You loggined successfully');
          else
            setMessage(response.data.result);
        });

      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <React.Fragment>
      <Modal show={show} size="sm" centered onHide={handleClose}>
        <SweetAlert show={alertShow} type={`info`} title={`Login failure.`} onConfirm={() => closeAlert()} > {message} </SweetAlert>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="form-group">
            <label htmlFor="email" className="sr-only">Email</label>
            <input type="email" id="email" className="form-control" placeholder="Email" value={userEmail} onChange={e => setUserEmail(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="sr-only">Password</label>
            <input type="password" id="password" className="form-control" placeholder="password" value={userPassword} onChange={e => setUserPassword(e.target.value)}/>
          </div>

          <div className="mt-3">
            <Button variant="primary" block onClick={onLogin}>{loading === '' ? 'Login' : 'Processing...'}</Button>
          </div>
        </Modal.Body>
      </Modal>

      <span className="login" style={{cursor: `pointer`}} onClick={handleShow}>Login</span>

    </React.Fragment>
  )
};

export default Login;