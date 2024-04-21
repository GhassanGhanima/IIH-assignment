import { createStore, applyMiddleware } from "redux";
import jobsReducer from "./reducers/jobReducer";
import { thunk } from "redux-thunk";


const store = createStore(jobsReducer, applyMiddleware(thunk));

export default store;