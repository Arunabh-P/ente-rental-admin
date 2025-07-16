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
    }),
    logoutAdmin:builder.mutation<{success:boolean;message:string},void>({
      query:()=>({
        url:"/logout",
        method:"POST"
      }),
      async onQueryStarted(_,{dispatch,queryFulfilled}){
        try {
          await queryFulfilled;
          dispatch(setAdmin(null));
          dispatch(
            showToast({
              title: "Logout Successful",
              message: "You have been logged out",
            })
          );

        } catch (error) {
          dispatch(
            showToast({
              title: "Logout Failed",
              message: error?.error?.data?.message || "Something went wrong",
            })
          );
        }
      }
    })
    
  }),
});

export const { useAdminLoginMutation,useLogoutAdminMutation } = authApi;
