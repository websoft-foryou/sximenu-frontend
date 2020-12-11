import React, {useState} from "react";
import Swiper from "react-id-swiper";
import menuOne from "../assets/img/hero-bg.jpg";
import ProductCard from "../component/ProductCard";
import {Scrollbars} from 'react-custom-scrollbars';
import Footer from "../layouts/Footer";
import "../assets/scss/product-listing.scss";
import {Link} from "react-router-dom";
import {FiChevronLeft} from "react-icons/fi";
import Logo from "../assets/img/logo.svg";
import vegan from "../assets/img/vegan.svg";
import chili from "../assets/img/chili.svg";
import meat from "../assets/img/meat.svg";
import App from "../App";

const productList = [
  {
    id: 1,
    icon: [meat, vegan, chili]
  },
  {
    id: 2,
    icon: [meat, vegan, chili]
  },
  {
    id: 3,
    icon: [meat, vegan, chili]
  },
  {
    id: 4,
    icon: [meat, vegan, chili]
  },
  {
    id: 5,
    icon: [meat, vegan, chili]
  },
  {
    id: 6,
    icon: [meat, vegan, chili]
  },
  {
    id: 7,
    icon: [meat, vegan, chili]
  },
  {
    id: 8,
    icon: [meat, vegan, chili]
  },
  {
    id: 9,
    icon: [meat, vegan, chili]
  }
];

const ProductListing = () => {
  const [getGallerySwiper] = useState(null);

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 0,
    loop: true,
    loopedSlides: 4,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };

  return (
    <App>
      <div dir="ltr" className="product-container"
           style={{backgroundImage: `url(${menuOne})`}}>
        <div className="full-overlay">
          <Link to="/result/2" className="back-to-home"><FiChevronLeft/></Link>

          <div className="site-logo">
            <Link to="/"><img src={Logo} alt=""/></Link>
          </div>

          <Swiper {...gallerySwiperParams}>
            <div className="product-slide">
              <Scrollbars
                style={{height: "100vh"}}>
                <h4 className="item-name">Fried Item</h4>
                <div className="product-listing">
                  {productList.map(p => {
                    return <ProductCard key={p.id} icons={p.icon}/>
                  })}
                </div>
              </Scrollbars>
            </div>

            <div className="product-slide">
              <Scrollbars
                style={{height: "100vh"}}>
                <h4 className="item-name">Wine</h4>
                <div className="product-listing">
                  {productList.map(p => {
                    return <ProductCard key={p.id} icons={p.icon}/>
                  })}
                </div>
              </Scrollbars>
            </div>

            <div className="product-slide">
              <Scrollbars
                style={{height: "100vh"}}>
                <h4 className="item-name">Burger</h4>
                <div className="product-listing">
                  {productList.map(p => {
                    return <ProductCard key={p.id} icons={p.icon}/>
                  })}
                </div>
              </Scrollbars>
            </div>
          </Swiper>
        </div>
      </div>

      <Footer/>
    </App>
  )
};

export default ProductListing;