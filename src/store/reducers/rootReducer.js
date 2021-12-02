import { combineReducers } from "redux";
import authReducer from "./auth";
import cartReducer from "./cart";

const appReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer
});

const rootReducer = (state, action) => {
  if (action.type === "logout") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
