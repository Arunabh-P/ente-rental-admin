import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/envVariables";
import { HouseResponse, PaginatedHouseResponse } from "../types/house";
import { showToast } from "../app/tost-slice";
import baseQueryWithReauth from "../utils/fetch-base-querry";

export const houseApi = createApi({
  reducerPath: "houseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["House"],
  endpoints: (builder) => ({
    getAllHouses: builder.query({
      query: (params) => ({
        url: "/house",
        params,
      }),
      providesTags: ["House"],
      transformResponse: (response: PaginatedHouseResponse) => response.data,
    }),
    getHouseById: builder.query({
      query: (id) => `/house/${id}`,
      providesTags: (result, error, id) => [{ type: "House", id }],
    }),
    getHouseBySlug: builder.query({
      query: (slug) => `/house/single/${slug}`,
      providesTags: (result, error, slug) => [{ type: "House", id: slug }],
      transformResponse: (response: HouseResponse) => response.data,
    }),
    createHouse: builder.mutation({
      query: (newHouse) => ({
        url: "/house/create",
        method: "POST",
        body: newHouse,
      }),
      invalidatesTags: ["House"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            showToast({
              title: "Success",
              message: "House details added successfully",
            })
          );
        } catch (error: any) {
          dispatch(
            showToast({
              title: "Error",
              message: error?.error || "Failed to add house details",
            })
          );
        }
      },
    }),
    updateHouse: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/house/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, slug) => [{ type: "House", slug }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            showToast({
              title: "Success",
              message: "House details updated successfully",
            })
          );
        } catch (error: any) {
          dispatch(
            showToast({
              title: "Error",
              message: error?.error || "Failed to update house details",
            })
          );
        }
      },
    }),
    uploadPhoto: builder.mutation({
      query: (FormData) => ({
        url: "/house/upload-photo/house",
        method: "POST",
        body: FormData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            showToast({
              title: "Success",
              message: "House details updated successfully",
            })
          );
        } catch (error: any) {
          dispatch(
            showToast({
              title: "Error",
              message: error?.error || "Failed to update house details",
            })
          );
        }
      },
    }),
    deleteHouse: builder.mutation({
      query: (id) => ({
        url: `/house/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, slug) => [{ type: "House", slug }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            showToast({
              title: "Success",
              message: "Deleted House successfully",
            })
          );
        } catch (error: any) {
          dispatch(
            showToast({
              title: "Error",
              message: error?.error || "Failed to delete house",
            })
          );
        }
      },
    }),
  }),
});

export const {
  useGetAllHousesQuery,
  useGetHouseByIdQuery,
  useCreateHouseMutation,
  useUpdateHouseMutation,
  useUploadPhotoMutation,
  useGetHouseBySlugQuery,
  useDeleteHouseMutation,
} = houseApi;
