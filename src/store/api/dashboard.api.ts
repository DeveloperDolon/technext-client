import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => ({
        url: "/dashboard/overview",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOverviewQuery } = dashboardApi;
