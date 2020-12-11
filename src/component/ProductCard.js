import React, {useState} from "react";
import "../assets/scss/product-card.scss";
import {Modal} from "react-bootstrap";
import ProductDetails from "./ProductDetails";
import {connect} from "react-redux";

const ProductCard = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const currentLang = props.lang !== '' ? props.lang : localStorage.getItem('lang');

  return (
    <React.Fragment>
      <Modal show={show}
             className="product-details-modal"
             centered
             onHide={handleClose}>

        <Modal.Header closeButton/>

        <Modal.Body>
          <ProductDetails icons={props.icons}/>
        </Modal.Body>
      </Modal>

      <div dir={currentLang === 'il' ? 'rtl' : 'ltr'} onClick={handleShow} className="product-card">
        <div className="product-img">
          <span className="ratio ratio-1-1">
            <span className="ratio-inner"><img src="https://picsum.photos/id/1080/200/200" alt=""/></span>
          </span>
        </div>

        <div className="product-desc">
          <h4 className="product-name">Chicken Fry</h4>
          <p className="product-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit cupiditate.</p>
          <p className="product-price">$ 80.00</p>
            {props.icons &&
            <span className="cat-icons">
            {props.icons.map((icon, i) => {
              return <span key={i} className="cat-icon"><img src={icon} alt=""/></span>
            })}
          </span>}
        </div>
      </div>
    </React.Fragment>
  )
};

const mapStateToProps = state => {
  return {
    lang: state.util.lang
  }
};

export default connect(mapStateToProps, null)(ProductCard);