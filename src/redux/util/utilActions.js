import {LANG_CHANGE_SUCCESS} from "./actionsTypes";

export const langChange = lang => {
  return dispatch => {
    localStorage.setItem("lang", lang);
    dispatch(langChangeSuccess(lang));
    // window.location.reload();
  }
};

export const langChangeSuccess = lang => {
  return {
    type: LANG_CHANGE_SUCCESS,
    payload: lang
  }
};