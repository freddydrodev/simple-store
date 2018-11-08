import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../actions/actionTypes";

const currentUser = (state = null, { type, user }) => {
  //switching action
  switch (type) {
    case USER_LOGGED_IN:
      return user;
    case USER_LOGGED_OUT:
      return null;
    default:
      return state;
  }
};

export default currentUser;
