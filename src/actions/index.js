import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  UPDATE_CATEGORY,
  UPDATE_PRODUCTS,
  UPDATE_CLIENTS,
  UPDATE_ORDERS,
  SELECT_ORDER,
  ADD_PRODUCT_TO_ORDER,
  UPDATE_SALES
} from "./actionTypes";

export const userLoggedIn = user => ({ type: USER_LOGGED_IN, user });
export const userLoggedOut = () => ({ type: USER_LOGGED_OUT });
export const updateCategory = data => ({ type: UPDATE_CATEGORY, data });
export const updateProducts = data => ({ type: UPDATE_PRODUCTS, data });
export const updateClients = data => ({ type: UPDATE_CLIENTS, data });
export const updateOrders = data => ({ type: UPDATE_ORDERS, data });
export const updateSales = data => ({ type: UPDATE_SALES, data });
export const selectOrder = order => ({ type: SELECT_ORDER, order });
// export const addProductToOrder = order => ({
//   type: ADD_PRODUCT_TO_ORDER,
//   product
// });
