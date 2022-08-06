import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carSize: "",
  noOfHours: null,
  entrance: "",
  slot: null,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    reset: (state) => {
      state.carSize = "";
      state.noOfHours = "";
      state.entrance = "";
      state.slot = null;
    },
    register: (state, action) => {
      state.carSize = action.payload.carSize;
      state.noOfHours = action.payload.hours;
      state.entrance = action.payload.entrance;
    },
    parkCar: (state, action) => {
      state.slot = action.payload;
    },
  },
});

export const { reset, register, parkCar } = carSlice.actions;

//export
export default carSlice.reducer;
