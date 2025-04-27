import {
  CreateClientValidationType,
  UpdateClientValidationType,
} from "../../pages/client_management/client.validation";
import { baseApi } from "./baseApi";

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    clientCreate: builder.mutation({
      query: (payload: CreateClientValidationType) => ({
        url: "/client/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["client"],
    }),
    clientUpdate: builder.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: UpdateClientValidationType;
      }) => ({
        url: `/client/update/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["client"],
    }),
    clientList: builder.query({
      query: ({}) => ({
        url: "/client/list",
        method: "GET",
      }),
      providesTags: ["client"],
    }),
    clientShow: builder.query({
      query: (id: string) => ({
        url: `/client/show/${id}`,
        method: "GET",
      }),
      providesTags: ["client"],
    }),
    clientDelete: builder.mutation({
      query: (id: string) => ({
        url: `/client/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["client"],
    }),
  }),
});

export const {
  useClientCreateMutation,
  useClientUpdateMutation,
  useClientDeleteMutation,
  useClientListQuery,
  useClientShowQuery,
} = clientApi;
