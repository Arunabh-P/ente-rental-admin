import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAdmin } from "../app/auth-slice";
import { showToast } from "../app/tost-slice";
import { baseUrl } from "../utils/envVariables";
type AdminDto = {
  id: string;
  name: string;
  email: string;
  role: string;
};
type responseDto = {
  success: boolean;
  message: string;
  data: {
    user: AdminDto;
  };
};

export const authDetailApi = createApi({
  reducerPath: "authDetailApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/admin` }),
  endpoints: (builder) => ({
    getAuthDetails: builder.query<responseDto, void>({
      query: () => ({
        url: "/auth-details",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAdmin(data.data.user));
        } catch (error) {
          dispatch(
            showToast({
              title: "Error",
              message:  "Session expired or unauthorized",
            })
          );
        }
      },
    }),
  }),
});

export const { useGetAuthDetailsQuery } = authDetailApi;
