import { configureStore } from "@reduxjs/toolkit";
import { houseApi } from "../services/houseApi";
import { uploadPhotoApi } from "../services/uploadPhotoApi";
import loaderReducer from "./loader-slice";
import toastReducer from "./tost-slice"
export const store  = configureStore({
    reducer:{
        loader:loaderReducer,
        toast:toastReducer,
        [houseApi.reducerPath]:houseApi.reducer,
        [uploadPhotoApi.reducerPath]:uploadPhotoApi.reducer

    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(houseApi.middleware).concat(uploadPhotoApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;