import { REHYDRATE } from "redux-persist";
import { SECURE_KEY } from "../../../constants/app";
import { createSlice } from "@reduxjs/toolkit";
import * as tokenService from "../../../epics-reducers/tokenServices";
import { userLoginRoutine, userLogoutRoutine } from "./routines";

const initialState = {
  token: "",
  _id: "",
  username: "",
  full_name: "",
  email: "",
  phone: "",
  created_at: "",
  updated_at: "",
  is_user: undefined,
  device_tokens: [],
  camera_devices: [],
  active: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clear: (state) => {
      state.token = "";
      state._id = "";
      state.username = "";
      state.full_name = "";
      state.email = "";
      state.phone = "";
      state.created_at = "";
      state.updated_at = "";
      state.device_tokens = [];
      state.camera_devices = [];
      state.is_user = undefined;
      tokenService.clearToken();
    },
  },
  extraReducers: {
    [REHYDRATE]: (state, action) => {
      if (action.key === SECURE_KEY) {
        if (action.payload) tokenService.setToken(action.payload?.token);
      }
    },
    [userLoginRoutine.SUCCESS]: (state, action) => {
      const {
        token,
        _id,
        username,
        full_name,
        email,
        phone,
        created_at,
        updated_at,
        isUser,
        device_tokens,
        camera_devices,
      } = action.payload;

      if (action.payload) {
        state.token = token;
        state._id = _id;
        state.username = username;
        state.full_name = full_name;
        state.email = email;
        state.phone = phone;
        state.created_at = created_at;
        state.updated_at = updated_at;
        state.is_user = isUser;
        state.device_tokens = device_tokens;
        state.camera_devices = camera_devices;
      }
    },
    [userLogoutRoutine.SUCCESS]: (state, action) => {
      state.token = "";
      state._id = "";
      state.username = "";
      state.full_name = "";
      state.email = "";
      state.phone = "";
      state.created_at = "";
      state.updated_at = "";
      state.device_tokens = [];
      state.camera_devices = [];
      state.is_user = undefined;
      tokenService.clearToken();
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
