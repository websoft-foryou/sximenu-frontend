import {FETCH_RESTAURANT_REQUEST, FETCH_RESTAURANT_SUCCESS, FETCH_RESTAURANT_FAILURE} from "./actionTypes";
import axios from "axios";

export const fetchAllRestaurant = inputValue => {
  return dispatch => {
    dispatch(fetchAllRestaurantRequest());
    axios
      .get('http://www.mocky.io/v2/5e33f6e73000007426d9613f')
      .then(response => {
        dispatch(fetchAllRestaurantSuccess(response.data))
      })
      .catch(err => {
        dispatch(fetchRestaurantFailure(err))
      });
  }
};

export const fetchAllRestaurantRequest = () => {
  return {
      type: FETCH_RESTAURANT_REQUEST
  }
};

export const fetchAllRestaurantSuccess = restaurants => {
  return {
    type: FETCH_RESTAURANT_SUCCESS,
    payload: restaurants
  }
};

export const fetchRestaurantFailure = err => {
  return {
    type: FETCH_RESTAURANT_FAILURE,
    payload: err
  }
};