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
  }),
});

export const { useSignupMutation } = authApi;
