const initialState = {
  profile: [],
  profiles: [],
  repos: [],
  loading: true,
  error: {},
  avatar: ""
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_PROFILE":
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case "PROFILE_ERROR":
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case "CLEAR_PROFILE":
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case "GET_PROFILES":
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    default:
      return state;
  }
}
