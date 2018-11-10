import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from "../actions/actionTypes";

const categories = (state = [], { type, cat }) => {
  switch (type) {
    case ADD_CATEGORY:
      break;
    case UPDATE_CATEGORY:
      console.log(cat);
      return cat;
    case DELETE_CATEGORY:
      break;
    default:
      return state;
  }
};

export default categories;
