import React, {useState} from "react";
import Swiper from 'react-id-swiper';
import {useRouteMatch} from "react-router-dom";
import '../assets/css/swiper.min.css';
import "../assets/scss/menu-slide.scss";
import {Link} from "react-router-dom";
import menuOne from "../assets/img/hero-bg.jpg";
import menuTwo from "../assets/img/page-header-bg.jpg";
import Footer from "../layouts/Footer";
import Logo from "../assets/img/logo.svg";
import {FiChevronLeft} from "react-icons/fi";
import Menu from "./Menu";

const MenuSlide = (props) => {
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

  const restaurantID = useRouteMatch().url.split('/')[1];

  return (
    <React.Fragment>
      <div dir="ltr" className="menu-container">
        <div className="menu-header">
          <Link to="/" className="back-to-home"><FiChevronLeft/></Link>

          {/* Site Logo */}
          <div className="site-logo">
            <Link to="/"><img src={Logo} alt="Six Menu"/></Link>
          </div>

          {/*Restaurant Name*/}
          <h3 className="restaurant-name">Marwa Kabab & Restaurant</h3>
        </div>

        <Swiper {...gallerySwiperParams}>
          <div className="slide-wrap">
            <Menu data={{img: menuOne, restaurantID: restaurantID}}/>
          </div>
          <div className="slide-wrap">
            <Menu data={{img: menuTwo, restaurantID: restaurantID}}/>
          </div>
          <div className="slide-wrap">
            <Menu data={{img: menuOne, restaurantID: restaurantID}}/>
          </div>
        </Swiper>
      </div>

      <Footer/>
    </React.Fragment>
  )
};

export default MenuSlide;