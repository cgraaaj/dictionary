import { combineReducers } from "redux";
import { reducer as fromReducer } from "redux-form";

import dataReducer from "./dataReducer";
import gAuthReducer from "./gAuthReducer";
import termReducer from "./termReducer";
import bookReducer from "./bookReducer";

export default combineReducers({
  form: fromReducer,
  data: dataReducer,
  gAuth: gAuthReducer,
  term: termReducer,
  books: bookReducer,
});
