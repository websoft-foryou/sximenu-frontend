import React from "react";
import "../assets/scss/pricing-table.scss";
import {Button} from "react-bootstrap";
import {FaCheck, FaTimes} from "react-icons/fa";

const PricingTable = function ({plan, price, shortText, planPeriod, featureList, isFeatured, handleSelectPlan}) {
  return (
    <div className={isFeatured ? 'pricing-table highlight' : 'pricing-table'}>
      <div className="table-header">
        <h4 className="title">{plan}</h4>
        <span className="price">{price > 0 ? price : 'Free'}
          {price > 0 && <sub><small> / {planPeriod}</small></sub>}
        </span>
        <span className="text d-block">{shortText}</span>
      </div>
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
      <div className="action">
        <Button
          onClick={() => handleSelectPlan(price)}
          variant={isFeatured ? 'secondary' : 'primary'} block>Get Started</Button>
      </div>
    </div>
  )
};

export default PricingTable;