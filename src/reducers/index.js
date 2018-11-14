import { combineReducers } from "redux";
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  UPDATE_CATEGORY
} from "../actions/actionTypes";

const reducers = combineReducers({
  currentUser: (state = null, { type, user }) => {
    switch (type) {
      case USER_LOGGED_IN:
        return user;
      case USER_LOGGED_OUT:
        return null;
      default:
        return state;
    }
  },
  categories: (state = [], { type, cat }) => {
    switch (type) {
      case UPDATE_CATEGORY:
        return cat;
      default:
        return state;
    }
  }
});

export default reducers;
