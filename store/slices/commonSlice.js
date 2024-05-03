const { createSlice } = require("@reduxjs/toolkit");

const initialCommonState = {
  countryCodes: [],
  relations: [],
  eventCategories: [],
  events: [],
  allEventsList: [],
  loading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState: initialCommonState,
  reducers: {
    setCountryCodes: (state, action) => {
      state.countryCodes = action.payload;
    },
    setRelations: (state, action) => {
      state.relations = action.payload;
    },
    setEventCategories: (state, action) => {
      state.eventCategories = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setAllEventsList: (state, action) => {
      state.allEventsList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const commonAction = commonSlice.actions;
export const commonReducer = commonSlice.reducer;
