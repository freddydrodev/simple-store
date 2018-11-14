import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  UPDATE_CATEGORY,
  UPDATE_PRODUCTS
} from "./actionTypes";

export const userLoggedIn = user => ({ type: USER_LOGGED_IN, user });
export const userLoggedOut = () => ({ type: USER_LOGGED_OUT });
export const updateCategory = data => ({ type: UPDATE_CATEGORY, data });
export const updateProducts = data => ({ type: UPDATE_PRODUCTS, data });
