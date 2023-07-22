import { configureStore } from "@reduxjs/toolkit";
import meSlice from "../features/meSlice";
import { baseApi } from "./services/baseApi";

const store = configureStore({
  reducer: {
    me: meSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
