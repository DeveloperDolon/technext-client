import {
  ProjectCreateValidationType,
  ProjectUpdateValidationType,
} from "../../pages/project_management/project.validation";
import { baseApi } from "./baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    projectCreate: builder.mutation({
      query: (payload: ProjectCreateValidationType) => ({
        url: "/project/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["project"],
    }),
    projectUpdate: builder.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: ProjectUpdateValidationType;
      }) => ({
        url: `/project/update/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["project"],
    }),
    projectList: builder.query({
      query: ({}) => ({
        url: "/project/list",
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    projectShow: builder.query({
      query: (id: string) => ({
        url: `/project/show/${id}`,
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    projectDelete: builder.mutation({
      query: (id: string) => ({
        url: `/project/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useProjectCreateMutation,
  useProjectUpdateMutation,
  useProjectListQuery,
  useProjectShowQuery,
  useProjectDeleteMutation,
} = projectApi;
