import { combineReducers } from "redux";

import currentUser from "./users";
import categories from "./categories";

const reducers = combineReducers({
  currentUser,
  categories
});

export default reducers;
