import { AuthType } from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user, error: null }
  : { isLoggedIn: false, user: null, error: null };

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AuthType.REGISTER_FAIL:
    case AuthType.REGISTER_SUCCESS:
    case AuthType.LOGIN_FAIL:
    case AuthType.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: payload.error,
      };
    case AuthType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    default:
      return state;
  }
}

export default authReducer;
