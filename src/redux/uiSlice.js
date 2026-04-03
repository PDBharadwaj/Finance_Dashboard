import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    role: "viewer",
    filter: "all",
    search: "",
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setRole, setFilter, setSearch } = uiSlice.actions;
export default uiSlice.reducer;