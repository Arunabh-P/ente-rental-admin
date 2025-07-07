import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/envVariables";

export const uploadPhotoApi = createApi({
    reducerPath: 'uploadPhotoApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/upload-photo` }),
    endpoints: (builder) => ({
        uploadHousePhoto: builder.mutation({
            query: (formData) => ({
                url: '/house',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useUploadHousePhotoMutation } = uploadPhotoApi;
