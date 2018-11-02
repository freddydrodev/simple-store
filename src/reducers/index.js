import { combineReducers } from "redux";

const reducers = combineReducers({
  currentUser: (state = null, action) => {
    //switching action
    switch (action.type) {
      case "logged_in":
        return action.user;
      case "logged_out":
        return null;
      default:
        return state;
    }
  }
});

export default reducers;
