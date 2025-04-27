import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./fetchBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ["user", "client", "project", "interaction", "reminder"],
});
