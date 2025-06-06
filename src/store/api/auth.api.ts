import { LoginValidationType } from "../../pages/login/login.validation";
import { SignupValidationType } from "../../pages/signup/signup.validation";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (payload: SignupValidationType) => ({
        url: "/user/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (payload: LoginValidationType) => ({
        url: "/user/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    me: builder.query({
      query: ({}) => ({
        url: "user/me",
        method: "/user/me",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useMeQuery } = authApi;
