import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastProps {
  isVisible: boolean;
  title: string;
  message: string;
}
const initialState: ToastProps = {
  isVisible: false,
  title: "",
  message: "",
};
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ title: string; message: string }>
    ) => {
      (state.isVisible = true),
        (state.title = action.payload.title),
        (state.message = action.payload.message);
    },
    hideToast: (state) => {
      (state.isVisible = false), (state.title = ""), (state.message = "");
    },
  },
});

export const { hideToast, showToast } = toastSlice.actions;
export default toastSlice.reducer;
