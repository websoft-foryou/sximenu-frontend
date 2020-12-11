import {CLOSE_NAVBAR, TOGGLE_NAVBAR} from "./actionTypes";

export const toggleNavigation = () => {
  return {
    type: TOGGLE_NAVBAR
  }
};

export const closeNavigation = () => {
  return {
    type: CLOSE_NAVBAR
  }
};