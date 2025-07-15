import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AdminDto = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthState = {
  admin: AdminDto | null;
};

const initialState: AuthState = {
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<AdminDto>) {
      state.admin = action.payload;
    },
    logout(state) {
      state.admin = null;
    },
  },
});

export const { setAdmin, logout } = authSlice.actions;
export default authSlice.reducer;
