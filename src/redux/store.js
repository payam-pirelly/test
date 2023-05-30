import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./car-slice";
import authReducer from "./auth-slice";

const store = configureStore({
  reducer: {
    car: carReducer,
    auth: authReducer,
  },
});

export default store;
