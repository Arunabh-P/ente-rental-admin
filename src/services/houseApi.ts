import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/envVariables";
import { PaginatedHouseResponse } from "../types/house";

export const houseApi = createApi({
    reducerPath: 'houseApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/house` }),
    tagTypes: ['House'],
    endpoints: (builder) => ({
        getAllHouses: builder.query({
            query: (params) => ({
                url: '',
                params
            }),
            providesTags: ['House'],
            transformResponse: (response: PaginatedHouseResponse) => response,
        }),
        getHouseById: builder.query({
            query: (id) => `${id}`,
            providesTags: (result, error, id) => [{ type: "House", id }]
        }),
        createHouse: builder.mutation({
            query: (newHouse) => ({
                url: 'create',
                method: "POST",
                body: newHouse
            }),
            invalidatesTags: ['House']
        }),
        updateHouse: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "House", id }]
        }),
        uploadPhoto: builder.mutation({
            query: (FormData) => ({
                url: 'upload-photo/house',
                method: "POST",
                body: FormData
            })
        })
    })
})

export const { useGetAllHousesQuery, useGetHouseByIdQuery, useCreateHouseMutation, useUpdateHouseMutation, useUploadPhotoMutation } = houseApi