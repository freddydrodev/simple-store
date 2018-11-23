import { combineReducers } from "redux";
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  UPDATE_CATEGORY,
  UPDATE_PRODUCTS,
  UPDATE_CLIENTS,
  UPDATE_ORDERS,
  SELECT_ORDER,
  UPDATE_SALES
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
  categories: (state = [], { type, data }) => {
    switch (type) {
      case UPDATE_CATEGORY:
        return data;
      default:
        return state;
    }
  },
  products: (state = [], { type, data }) => {
    switch (type) {
      case UPDATE_PRODUCTS:
        return data;
      default:
        return state;
    }
  },
  clients: (state = [], { type, data }) => {
    switch (type) {
      case UPDATE_CLIENTS:
        return data;
      default:
        return state;
    }
  },
  orders: (state = [], { type, data }) => {
    switch (type) {
      case UPDATE_ORDERS:
        return data;
      default:
        return state;
    }
  },
  sales: (state = [], { type, data }) => {
    switch (type) {
      case UPDATE_SALES:
        return data;
      default:
        return state;
    }
  },
  selectedOrder: (state = null, { type, order }) => {
    switch (type) {
      case SELECT_ORDER:
        return order || state;
      default:
        return state;
    }
  }
});

export default reducers;
