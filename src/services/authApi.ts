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
  data: {
    user: AdminDto;
  };
};

type RequestDto = {
  email: string;
  password: string;
};
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    adminLogin: builder.mutation<responseDto, RequestDto>({
      query: ({ email, password }) => ({
        url: "/admin/login",
        method: "POST",
        body: { email, password },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAdmin(data.data.user));
        } catch (error) {
          dispatch(
            showToast({
              title: "Error",
              message: error?.error || "Failed to Login",
            })
          );
        }
      },
    }),
  }),
});

export const { useAdminLoginMutation } = authApi;
