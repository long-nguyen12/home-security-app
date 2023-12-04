import { createSlice } from "@reduxjs/toolkit";
import { settingRoutine } from "./routines";

const initialState = {
    coords: null,
    settings: null,
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setCurrentLocation: (state, action) => {
            state.coords = action.payload;
        },
    },
    extraReducers: {
        [settingRoutine.SUCCESS]: (state, action) => {
            state.settings = action.payload;
        },
    },
});

export const homeReducer = homeSlice.reducer;
export const homeActions = homeSlice.actions;
