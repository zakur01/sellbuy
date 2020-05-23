const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case "USER_LOADED":
      // localStorage.setItem("token", payload.token);

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
