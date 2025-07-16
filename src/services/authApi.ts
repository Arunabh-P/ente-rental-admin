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
  data:  AdminDto;
};

type RequestDto = {
  email: string;
  password: string;
};
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/admin` }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation<responseDto, RequestDto>({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAdmin(data.data));
        } catch (error) {
          console.log(error,'error');
          dispatch(
            showToast({
              title: "Error",
              message: error?.error.data.message || "Failed to Login",
            })
          );
        }
      },
    })
    
  }),
});

export const { useAdminLoginMutation } = authApi;
