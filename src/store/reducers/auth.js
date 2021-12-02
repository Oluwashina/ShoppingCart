const initState = {
  isAuthenticated: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.data.token);
      return {
        ...state,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
