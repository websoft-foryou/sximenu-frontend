import {FETCH_RESTAURANT_REQUEST, FETCH_RESTAURANT_SUCCESS, FETCH_RESTAURANT_FAILURE} from "./actionTypes";

const initialState = {
  loading: true,
  restaurants: [
    {
      label: "Grandiose Restaurant",
      value: "grandiose-restaurant"
    },
    {
      label: "Sajna Restaurant",
      value: "sajna-restaurant"
    },
    {
      label: "Star Kabab & Restaurant",
      value: "star-kabab-restaurant"
    },
    {
      label: "Saltz Fine Seafood",
      value: 'saltz-fine-seafood'
    },
    {
      label: "ABC Restaurant",
      value: "abc-restaurant"
    },
    {
      label: "El Toro Mexican Restaurant",
      value: "el-toro-mexican-Restaurant"
    }
  ],
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload
      };
    case FETCH_RESTAURANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;