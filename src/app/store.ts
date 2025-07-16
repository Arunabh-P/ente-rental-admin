import { configureStore } from "@reduxjs/toolkit";
import { houseApi } from "../services/houseApi";
import { uploadPhotoApi } from "../services/uploadPhotoApi";
import loaderReducer from "./loader-slice";
import toastReducer from "./tost-slice";
import authReducer from "./auth-slice";
import { authApi } from "../services/authApi";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    toast: toastReducer,
    auth: authReducer,
    [houseApi.reducerPath]: houseApi.reducer,
    [uploadPhotoApi.reducerPath]: uploadPhotoApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      houseApi.middleware,
      uploadPhotoApi.middleware,
      authApi.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
