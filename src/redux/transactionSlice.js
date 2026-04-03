import { createSlice } from "@reduxjs/toolkit";
import { transactions as initialData } from "../data/mockData";

const loadData = () => {
  const data = localStorage.getItem("transactions");
  return data ? JSON.parse(data) : initialData;
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState: loadData(),
  reducers: {
    addTransaction: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state));
    },
    updateTransaction: (state, action) => {
      const index = state.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem("transactions", JSON.stringify(state));
      }
    }
  },
});

export const { addTransaction, updateTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;