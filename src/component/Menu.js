import React from "react";
import {Link} from "react-router-dom";
import "../assets/scss/menu.scss"

const Menu = (props) => {
  return (
    <Link to={`/restaurant/${props.data.restaurantID}/fried-item`}  className="menu-slide" style={{backgroundImage: `url(${props.data.img})`}}>
        <span className="slide-inner">
          <span className="menu-title">Fried Item</span>
        </span>
    </Link>
  )
};

export default Menu;