import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (value) => {
  const { data } = await axios({
    baseURL: process.env.NEXT_PUBLIC_URL,
    url: "/login/",
    method: "post",
    data: value,
  });

  return data;
});

export const registerApi = createAsyncThunk("auth/registerApi", async (value) => {
  const { data } = await axios({
    baseURL: process.env.NEXT_PUBLIC_URL,
    url: "/register/",
    method: "post",
    data: value,
  });

  return data;
});

export const logout = createAsyncThunk("auth/logout", async (value) => {
  const { data } = await axios({
    baseURL: process.env.NEXT_PUBLIC_URL,
    url: "/logout/",
    method: "get",
  });

  return data;
});

const initialState = {
  auth: null,
  loading: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.token = payload.idToken;
      state.loading = false;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = true;
    },
    [logout.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.token = undefined;
      state.loading = false;
    },
    [logout.rejected]: (state, { payload }) => {
      state.loading = true;
    },
    [registerApi.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [registerApi.fulfilled]: (state, action) => {
      state.token = undefined;
      state.loading = false;
    },
    [registerApi.rejected]: (state, { payload }) => {
      state.loading = true;
    },
  },
});

export default authSlice.reducer;
