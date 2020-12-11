import {CLOSE_NAVBAR, TOGGLE_NAVBAR} from "./actionTypes";

const initialState = {
  isShowingNavbar: false
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAVBAR:
      return {
        ...state,
        isShowingNavbar: !state.isShowingNavbar
      };
    case CLOSE_NAVBAR:
      return {
        ...state,
        isShowingNavbar: false
      };
    default:
      return state
  }
};

export default navigationReducer;