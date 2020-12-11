import React, {useState} from "react";
import "../assets/scss/product-details.scss";
import Swiper from "react-id-swiper";
import {utils} from "../helper/utils";

const ProductDetails = (props) => {
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
    <div dir={utils.siteLanguage() === 'il' ? 'rtl' : ''} className="product-details">
      <Swiper {...gallerySwiperParams}>
        <div className="ratio ratio-16-9">
          <div className="ratio-inner">
            <img src="https://picsum.photos/id/1080/800/450" alt=""/>
          </div>
        </div>

        <div className="ratio ratio-16-9">
          <div className="ratio-inner">
            <img src="https://picsum.photos/id/1000/800/450" alt=""/>
          </div>
        </div>

        <div className="ratio ratio-16-9">
          <div className="ratio-inner">
            <img src="https://picsum.photos/id/230/800/450" alt=""/>
          </div>
        </div>
      </Swiper>

      <div className="product-info">
        <h3 className="product-name">Chicken Fry</h3>
        <p className="d-flex v-middle">
          <span className='product-price'>$ 80.00</span>

          {props.icons &&
          <span className="cat-icons ml-auto">
            {props.icons.map((icon, i) => {
              return <span key={i} className="cat-icon"><img src={icon} alt=""/></span>
            })}
          </span>}
        </p>

        <div className="entry-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam architecto aspernatur consequuntur
          dolorum ducimus enim eos exercitationem, explicabo harum hic in inventore modi molestiae mollitia obcaecati
          praesentium, provident quasi quia quibusdam quidem quis quos recusandae reprehenderit sapiente, totam vel
          voluptatum. Aliquid eius incidunt nobis repellat sit voluptatibus! Asperiores, facere?
        </div>
      </div>
    </div>
  )
};

export default ProductDetails;