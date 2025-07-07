import { configureStore } from "@reduxjs/toolkit";
import { houseApi } from "../services/houseApi";
import { uploadPhotoApi } from "../services/uploadPhotoApi";

export const store  = configureStore({
    reducer:{
        [houseApi.reducerPath]:houseApi.reducer,
        [uploadPhotoApi.reducerPath]:uploadPhotoApi.reducer

    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(houseApi.middleware).concat(uploadPhotoApi.middleware)
})