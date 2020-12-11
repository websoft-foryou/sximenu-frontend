import {LANG_CHANGE_FAILURE, LANG_CHANGE_SUCCESS} from "./actionsTypes";

const initialState = {
  lang: '',
  langErr: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LANG_CHANGE_SUCCESS:
      return {
        ...state,
        lang: action.payload
      };
    case LANG_CHANGE_FAILURE:
      return {
        ...state,
        langErr: action.payload
      };
    default: return state
  }
};

export default reducer;