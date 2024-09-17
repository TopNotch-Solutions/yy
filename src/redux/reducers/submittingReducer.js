import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSubmitting: false,
};

  export const isSubmittingSlice = createSlice({
    name: "submitting",
    initialState,
    reducers: {
        toggleIsSubmittingTrue: (state) => {
            state.isSubmitting = true;
        },
        toggleIsSubmittingfalse: (state) => {
          state.isSubmitting = false;
      },
    },
  });
  console.log("inittail state",initialState)
  export const { toggleIsSubmittingTrue, toggleIsSubmittingfalse} = isSubmittingSlice.actions

  export default isSubmittingSlice.reducer