import React, {useEffect} from "react";
import App from "../App";
import {Container} from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import heroBG from "../assets/img/hero-bg.jpg";
import {FaSearch} from "react-icons/fa";
import QrCodeReader from "../component/QrReader";
import AsyncSelect from 'react-select/async';
import '../assets/scss/hero-section.scss';
import {Link} from "react-router-dom";
import Login from "../component/Login";
import {fetchAllRestaurant} from "../redux";
import {connect} from "react-redux";

const searchInputStyle = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted rgba(0, 0, 0, .1)',
    color: state.isSelected ? '#fff !important' : '#121212 !important',
    padding: '10px 15px',
  }),
  placeholder: () => ({
    padding: '4px 0',
    color: '#fff'
  }),
  control: () => ({
    width: '100%',
    height: '50px',
    border: '1px solid #fff',
    color: '#fff !important',
    borderRadius: '50px',
    lineHeight: '36px',
    padding: '0 30px'
  }),
  dropdownIndicator: () => (
    {
      display: 'none'
    }
  ),
  input: () => ({
    color: '#ffffff',
    padding: '4px 0',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return {...provided, opacity, transition};
  },
  menu: (provided, state) => ({
    ...provided,
    marginTop: "1px"
  })
};

const Home = (props) => {
  useEffect(() => {
    getLocation();
    // props.fetchRestaurant();
  },[]);

  const filterRestaurant = async inputValue => {
    return props.restaurantData.restaurants.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      resolve(filterRestaurant(inputValue));
    });

  function handleGetRestaurantMenu(value) {
    props.history.push('/restaurant/' + value);
  }

  const handleScan = data => {
    if (data) {
      props.history.push('/restaurant/' + data);
    }
  };

  const handleError = err => {
    alert(err);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
      });
    } else {
      console.log('Sorry! Geolocation is not supported by this browser.')
    }
  };

  return (
    <App>
      <div className="hero-section has-overlay" style={{backgroundImage: `url(${heroBG})`}}>
        <div className="hero-overlay">
          <div className="hero-content">
            <Container>
              <div className="row">
                <div className="col-lg-7 mx-auto">
                  <div className="content-header">
                    <img src={logo} alt="Six Menu" className="logo-img"/>
                  </div>

                  <div className="hero-search-form">
                    <div className="form-group mb-4">
                      <label htmlFor="heroSearchInput" className="sr-only">Search by restaurant ID</label>
                      <div className="fp__input-group">
                        <AsyncSelect
                          styles={searchInputStyle}
                          cacheOptions
                          defaultOptions
                          placeholder="Search restaurant..."
                          onChange={opt => handleGetRestaurantMenu(opt.value)}
                          loadOptions={promiseOptions}/>

                        <span className="fp__icon"><FaSearch/></span>
                      </div>
                    </div>

                    <div className="mt-4 qr-action">
                      <QrCodeReader handleScan={handleScan} handleError={handleError}/>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>


          <div className="content-footer">
            <p className="footer-link"><Link to="/profile/about-us">About Us</Link>&nbsp;&nbsp; | &nbsp;&nbsp;
              <Login/>&nbsp;&nbsp; | &nbsp;&nbsp; <Link to="/signup">Signup</Link></p>
            <p>&copy; 2020 <strong>Six Menu</strong>. All right reserved.</p>
          </div>
        </div>
      </div>
    </App>
  );
};

const mapStateToProps = state => {
  return {
    restaurantData: state.restaurant
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurant: () => dispatch(fetchAllRestaurant())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
