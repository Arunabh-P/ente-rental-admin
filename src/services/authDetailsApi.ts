import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../utils/fetch-base-querry";
import { setAdmin } from "../app/auth-slice";
import { showToast } from "../app/tost-slice";
type AdminDto = {
  id: string;
  name: string;
  email: string;
  role: string;
};
type responseDto = {
  success: boolean;
  message: string;
  data:  AdminDto;
};

export const authDetailsApi = createApi({
  reducerPath: "authDetailsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAuthDetails: builder.query<responseDto, void>({
      query: () => ({
        url: "/admin/auth-details",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAdmin(data.data));
        } catch (error) {
          if(error.error.data.errorCode !== 'NO_TOKEN'){
            dispatch(
              showToast({
                title: "Error",
                message: error.error.data.message || "Session expired or unauthorized",
              })
            );
          }
        }
      },
    }),
  }),
});

export const { useGetAuthDetailsQuery } = authDetailsApi;
