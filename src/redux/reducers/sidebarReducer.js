import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
};

  export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebarTrue: (state) => {
            state.isSidebarOpen = true;
        },
        toggleSidebarfalse: (state) => {
          state.isSidebarOpen = false;
      },
    },
  });
  console.log("inittail state",initialState)
  export const { toggleSidebarTrue, toggleSidebarfalse} = sidebarSlice.actions

  export default sidebarSlice.reducer