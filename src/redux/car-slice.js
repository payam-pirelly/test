import { createSlice } from "@reduxjs/toolkit";
import { carData } from "../utils/carData";

const initialState = {
  car: carData,
  carIndex: 1,
  carStatus: "main",
  fullScreen: false,
  isHotspot: false,
  leftSideBar: false,
  carTabIndex: 0,
  interiorCarStatus: "front",
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    toggledCarIndex: (state, action) => {
      state.carIndex = action.payload;
    },
    toggledCarStatus: (state, action) => {
      state.carStatus = action.payload;
    },
    toggledFullScreen: (state, { payload }) => {
      state.fullScreen = payload;
    },
    toggledIsHotspot: (state) => {
      state.isHotspot = !state.isHotspot;
    },
    toggledLeftSideBar: (state, { payload }) => {
      state.leftSideBar = payload;
    },
    toggledCarTabIndex: (state, { payload }) => {
      state.carTabIndex = payload;
    },
    toggledEnteriorCarStatus: (state, { payload }) => {
      state.interiorCarStatus = payload;
    },
  },
});

export default carSlice.reducer;
export const {
  toggledCarIndex,
  toggledFullScreen,
  toggledCarStatus,
  toggledIsHotspot,
  toggledLeftSideBar,
  toggledCarTabIndex,
  toggledEnteriorCarStatus,
} = carSlice.actions;
