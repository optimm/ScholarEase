import { baseApi } from "./baseApi";
import { authenticateMe } from "../../features/meSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ body }) => {
        return {
          url: "auth/register",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllUsers", "SingleUser"],
    }),
    login: builder.mutation({
      query: ({ body }) => {
        return {
          url: "auth/login",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const { data: user } = data;
        dispatch(authenticateMe({ isAuthenticated: true, data: user }));
      },
      invalidatesTags: ["SingleUser", "AllUsers", "SingleProject"],
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: `auth/logout`,
          method: "GET",
        };
      },
      invalidatesTags: ["AllUsers", "SingleUser", "CheckAuth", "SingleProject"],
    }),
    changePassword: builder.mutation({
      query: ({ body }) => {
        return {
          url: `auth/change-password`,
          method: "PUT",
          body,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: ({ body }) => {
        return {
          url: `auth/forgot-password`,
          method: "POST",
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ body, token }) => {
        return {
          url: `auth/reset-password?token=${token}`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
