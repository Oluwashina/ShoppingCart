import { combineReducers } from "redux";
import authReducer from "./auth";

const appReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "logout") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
