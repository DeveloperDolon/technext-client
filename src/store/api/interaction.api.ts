import {
  CreateInteractionValidationType,
  UpdateInteractionValidationType,
} from "../../pages/interaction_management/interaction.validation";
import { baseApi } from "./baseApi";

const interactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    interactionCreate: builder.mutation({
      query: (payload: CreateInteractionValidationType) => ({
        url: "/interaction/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["interaction"],
    }),
    interactionUpdate: builder.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: UpdateInteractionValidationType;
      }) => ({
        url: `/interaction/update/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["interaction"],
    }),
    interactionList: builder.query({
      query: ({}) => ({
        url: "/interaction/list",
        method: "GET",
      }),
      providesTags: ["interaction"],
    }),
    interactionShow: builder.query({
      query: (id: string) => ({
        url: `/interaction/show/${id}`,
        method: "GET",
      }),
      providesTags: ["interaction"],
    }),
    interactionDelete: builder.mutation({
      query: (id: string) => ({
        url: `/interaction/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["interaction"],
    }),
  }),
});

export const {
  useInteractionCreateMutation,
  useInteractionUpdateMutation,
  useInteractionDeleteMutation,
  useInteractionListQuery,
  useInteractionShowQuery,
} = interactionApi;
