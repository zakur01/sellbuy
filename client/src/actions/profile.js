import axios from "axios";

import { setAlert } from "./alert";

// профиль залогиненного пользователя
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: "GET_PROFILE",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//список всех профилей
export const getProfiles = () => async dispatch => {
  dispatch({ type: "CLEAR_PROFILE" });

  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: "GET_PROFILES",
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
//поиск пользователя по ID
export const getProfileById = userId => async dispatch => {

  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: "GET_PROFILE",
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}



export const createProfile = (formData, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: "GET_PROFILE",
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

 
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
