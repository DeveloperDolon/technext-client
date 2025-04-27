import {
  ReminderCreateValidationType,
  ReminderUpdateValidationType,
} from "../../pages/reminder_management/reminder.validation";
import { baseApi } from "./baseApi";

const reminderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reminderCreate: builder.mutation({
      query: (payload: ReminderCreateValidationType) => ({
        url: "/reminder/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["reminder"],
    }),
    reminderUpdate: builder.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: ReminderUpdateValidationType;
      }) => ({
        url: `/reminder/update/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["reminder"],
    }),
    reminderList: builder.query({
      query: ({}) => ({
        url: "/reminder/list",
        method: "GET",
      }),
      providesTags: ["reminder"],
    }),
    reminderShow: builder.query({
      query: (id: string) => ({
        url: `/reminder/show/${id}`,
        method: "GET",
      }),
      providesTags: ["reminder"],
    }),
    reminderDelete: builder.mutation({
      query: (id: string) => ({
        url: `/reminder/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reminder"],
    }),
    upcomingReminder: builder.query({
      query: ({}) => ({
        url: "/reminder/upcoming",
        method: "GET",
      }),
      providesTags: ["reminder"],
    }),
  }),
});

export const {
  useReminderCreateMutation,
  useReminderUpdateMutation,
  useReminderDeleteMutation,
  useReminderListQuery,
  useReminderShowQuery,
  useUpcomingReminderQuery,
} = reminderApi;
