import React from "react";
import "../assets/scss/pricing-table.scss";
import {Button} from "react-bootstrap";
import {FaCheck, FaTimes} from "react-icons/fa";

const PricingTable = function ({plan, price, shortText, planPeriod, featureList, isFeatured, isPurchased, handleSelectPlan}) {
  return (
    <div className={isFeatured ? 'pricing-table highlight text-center' : 'pricing-table text-center'}>
      <div className="table-header">
        <h4 className="title">{plan}</h4>
        <span className="price">{price > 0 ? price : 'Free'}
          {price > 0 && <sub><small> / {planPeriod}</small></sub>}
        </span>
        <span className="text d-block">{shortText}</span>
      </div>
      {isPurchased &&
        <div className="purchased">You have <b>{plan}</b> now.</div>
      }
      {!isPurchased &&
        <div className="action">
            <Button className="btn btn-lg" onClick={() => handleSelectPlan(price)} variant={isFeatured ? 'success' : 'success'} block>Get Started</Button>
        </div>
      }
      <ul className="features-list">
        {featureList.map((item, index) => {
          return (
            <li key={index} className={item.isActive ? '' : 'disabled'}>
              {item.isActive ? <><span className="list-icon"><FaCheck/></span> {item.text}</> :
                <><span className="list-icon"><FaTimes/></span> <strike>{item.text}</strike></>
              }
            </li>
          )
        })}
      </ul>


    </div>
  )
};

export default PricingTable;