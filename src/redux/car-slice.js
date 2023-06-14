import { createSlice } from "@reduxjs/toolkit";
import { carData, gallery } from "../utils/carData";

const initialState = {
  cars: carData,
  gallery: gallery,
  showCarItem: undefined,
  carStatus: "main",
  fullScreen: false,
  carHotSpotEnable: false,
  leftSideBar: false,
  carTabIndex: 0,
  interiorCarStatus: "front",
  firstHotSpotPosition: { x: 0, y: 0 },
  secondHotSpotPosition: { x: 0, y: 0 },
  carHotSpotCardStatus: 1,
  carHotSpotCardOpen: false,
  carHotSpotPositions: [],
  currentCarHotSpotIndex: 0,
  carHotSpotReload: true,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    showCarItemSet: (state, action) => {
      state.showCarItem = action.payload;
    },
    toggledCarStatus: (state, action) => {
      state.carStatus = action.payload;
    },
    toggledFullScreen: (state, { payload }) => {
      state.fullScreen = payload;
    },
    carHotSpotEnableSet: (state, { payload }) => {
      state.carHotSpotEnable = payload;
    },
    toggledLeftSideBar: (state, { payload }) => {
      state.leftSideBar = payload;
    },
    toggledCarTabIndex: (state, { payload }) => {
      state.carTabIndex = payload;
    },
    toggledInteriorCarStatus: (state, { payload }) => {
      state.interiorCarStatus = payload;
    },
    toggledFirstHotSpotPosition: (state, { payload }) => {
      const { x, y } = payload;
      state.firstHotSpotPosition.x = x;
      state.firstHotSpotPosition.y = y;
    },
    toggledSecondHotSpotPosition: (state, { payload }) => {
      const { x, y } = payload;
      state.secondHotSpotPosition.x = x;
      state.secondHotSpotPosition.y = y;
    },
    carHotSpotCardStatusSet: (state, { payload }) => {
      state.carHotSpotCardStatus = payload;
    },
    carHotSpotCardOpenToggled: (state) => {
      state.carHotSpotCardOpen = !state.carHotSpotCardOpen;
    },
    carHotSpotPositionsSet: (state, { payload }) => {
      state.carHotSpotPositions = [];
      state.carHotSpotPositions = payload;
    },
    currentCarHotSpotIndexSet: (state, { payload }) => {
      let index = state.carHotSpotPositions.findIndex(
        (car) => car?.id === state.currentCarHotSpotIndex
      );
      if (payload === "increase") {
        index++;
        if (0 <= index && index < state.carHotSpotPositions?.length) {
          const id = state.carHotSpotPositions[index]?.id;
          state.currentCarHotSpotIndex = id;
        } else {
          const id = state.carHotSpotPositions[0]?.id;
          state.currentCarHotSpotIndex = id;
        }
      } else if (payload === "decrease") {
        index--;
        if (0 <= index && index < state.carHotSpotPositions?.length) {
          const id = state.carHotSpotPositions[index]?.id;
          state.currentCarHotSpotIndex = id;
        } else {
          const id =
            state.carHotSpotPositions[state.carHotSpotPositions?.length - 1]
              ?.id;
          state.currentCarHotSpotIndex = id;
        }
      } else state.currentCarHotSpotIndex = payload;
    },
    carHotSpotReloadToggled: (state) => {
      state.carHotSpotReload = !state.carHotSpotReload;
    },
  },
});

export default carSlice.reducer;
export const {
  showCarItemSet,
  toggledFullScreen,
  toggledCarStatus,
  carHotSpotEnableSet,
  toggledLeftSideBar,
  toggledCarTabIndex,
  toggledInteriorCarStatus,
  toggledFirstHotSpotPosition,
  toggledSecondHotSpotPosition,
  carHotSpotCardStatusSet,
  carHotSpotCardOpenToggled,
  carHotSpotPositionsSet,
  currentCarHotSpotIndexSet,
  carHotSpotReloadToggled,
} = carSlice.actions;
