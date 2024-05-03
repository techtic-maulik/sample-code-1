import { createSlice } from "@reduxjs/toolkit";

const getFromStorage = (key) => {
  return typeof window !== "undefined" && localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];
};

const initialUserState = {
  user: getFromStorage("family-table"),
  isLoading: false,
  isAuthenticated: false,
  currentActiveTab: "",
  groups: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setLoadingTrue: (state) => {
      state.isLoading = true;
    },
    setLoadingFalse: (state) => {
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setCurrentActiveTab: (state, action) => {
      state.currentActiveTab = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
