import { createSlice } from "@reduxjs/toolkit";

const meSlice = createSlice({
  name: "me",
  initialState: {
    isAuthenticated: false,
    myData: {},
  },
  reducers: {
    authenticateMe: (state, action) => {
      const { isAuthenticated, data, isAdmin } = action.payload;
      if (isAuthenticated) {
        state.isAuthenticated = true;
        state.isAdmin = isAdmin;
        state.myData = data;
      } else {
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.myData = {};
      }
    },
  },
});

export const { authenticateMe } = meSlice.actions;

export default meSlice.reducer;
