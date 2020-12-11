import React from "react";
import ProductCard from "./ProductCard";
import "../assets/scss/menu-block.scss";

const MenuBlock = () => {
  return (
    <div className="menu-block">
      <div className="menu-block-header">
        <h4 className="menu-block-title">FRIED ITEMS</h4>
      </div>

      <div className="menu-block-body">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
    </div>
  )
};

export default MenuBlock;