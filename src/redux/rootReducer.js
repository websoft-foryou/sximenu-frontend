import {combineReducers} from "redux";
import navigationReducer from "./navigation/navigationReducer";
import restaurantReducer from "./restaurant/restaurantReducer";
import utilReducer from "./util/utilReducer";

const rootReducer = combineReducers({
  navigation: navigationReducer,
  restaurant: restaurantReducer,
  util: utilReducer
});

export default rootReducer;