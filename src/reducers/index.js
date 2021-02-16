import { combineReducers } from "redux";

import dataReducer from "./dataReducer";
import gAuthReducer from "./gAuthReducer";
import termReducer from "./termReducer";

export default combineReducers({
  data: dataReducer,
  gAuth: gAuthReducer,
  term: termReducer,
});
