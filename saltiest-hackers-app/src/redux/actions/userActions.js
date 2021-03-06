import axios from 'axios';
import jwt from "jsonwebtoken";

const apiURL = 'https://saltiest-hacker-bw.herokuapp.com';

export const FETCH_USER_START = 'FETCH_USER_START';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
// export const fetchUser = () => {
//   return dispatch => {
//     dispatch({ type: FETCH_USER_START });
//     axios
//       .get('https://saltiest-hacker-bw.herokuapp.com/')
//       .then(res => {
//         console.log(res);
//         // dispatch({ type: FETCH_USER_SUCCESS });
//       })
//       .catch(err => {
//         console.log(err);
//         // dispatch({ type: FETCH_USER_FAILURE });
//       });
//   };
// };

export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const loginUser = (username, password) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER_START });
    axios
      .post(`${apiURL}/api/users/login`, { username: username, password: password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data, userId: jwt.decode(res.data.token).sub });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: LOGIN_USER_FAILURE, payload: err.response.data.message });
      });
  };
};

export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = () => {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_USER });
  };
};

export const REGISTER_USER_START = 'REGISTER_USER_START';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const registerUser = newUser => {
  return dispatch => {
    dispatch({ type: REGISTER_USER_START });
    axios
      .post(`${apiURL}/api/users/register`, newUser)
      .then(res => {
        // res.data[0] - {first_name, last_name, username, id}
        dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data[0] });
      })
      .catch(err => {
        // err.response.data.errorMessage.detail - "already exists"
        // err.response.data.errorMessage.code - 23505
        // err.response.data.message - "missing field"
        dispatch({ type: REGISTER_USER_FAILURE, payload: err.response.data });
      });
  };
};

export const CLEAR_NEW_USER_DATA = 'CLEAR_NEW_USER_DATA';
export const clearNewUserData = () => {
  return dispatch => {
    dispatch({ type: CLEAR_NEW_USER_DATA })
  };
};
