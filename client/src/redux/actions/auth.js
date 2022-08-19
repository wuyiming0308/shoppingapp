import { AuthType } from "./type";
import { loginRequest, registerRequest } from "../../data/requestservice";
const register = (email, password) => (dispatch) => {
  return registerRequest({ email, password }).then((response) => {
    if (response.success) {
      dispatch({
        type: AuthType.REGISTER_SUCCESS,
        payload: {
          user: null,
        },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: AuthType.REGISTER_FAIL,
        payload: {
          user: null,
        },
      });
      return Promise.reject(response.error);
    }
  });
};

const login = (email, password) => (dispatch) => {
  return loginRequest({ email, password }).then(
    (response) => {
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        dispatch({
          type: AuthType.LOGIN_SUCCESS,
          payload: {
            user: response.user,
          },
        });
        console.log(response.token);
        return Promise.resolve(response.user);
      } else {
        console.log(response);
        dispatch({
          type: AuthType.LOGIN_FAIL,
          payload: {
            user: null,
          },
        });
        return Promise.reject(response.error);
      }
    },
    (e) => {
      return Promise.reject("Login failed");
    }
  );
};

const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: AuthType.LOGOUT,
    payload: {
      user: null,
    },
  });
  Promise.resolve();
};

export { register, login, logout };
