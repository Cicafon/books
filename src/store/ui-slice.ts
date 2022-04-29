import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialUiStateType {
  loading: boolean;
  error?: string;
}

const initialUiState: InitialUiStateType = {
  loading: true,
  error: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
