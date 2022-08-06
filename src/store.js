import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./features/carSlice";
import logger from "redux-logger";

const reducer = {
  car: carReducer,
};

//setup store
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
