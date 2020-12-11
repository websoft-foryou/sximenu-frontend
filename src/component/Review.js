import React from "react";
import {Button} from "react-bootstrap";
import Rating from "react-rating";
import star from "../assets/img/star.svg";
import starFull from "../assets/img/star-full.svg";
import "../assets/scss/review.scss";


const Review = () => {
  const handleReviewRaring = (value) => {
    console.log(value);
  };

  return (
    <div className="review-container">
      <div className="review-form">
        <div className="form-group">
          <label className="sr-only">Rating</label>
          <Rating className="review-rating"
                  initialRating={4}
                  onClick={(value) => handleReviewRaring(value)}
                  emptySymbol={<img src={star} className="rating-icon" alt=""/>}
                  fullSymbol={<img src={starFull} className="rating-icon" alt=""/>}/>
        </div>

        <div className="form-group">
          <label htmlFor="reviewComment" className="sr-only">Review Comment</label>
          <textarea id="reviewComment" placeholder="Your comment" className="form-control" rows="4"/>
        </div>

        <div className="text-right">
          <Button variant="primary">Submit Review</Button>
        </div>
      </div>
    </div>
  )
};

export default Review;