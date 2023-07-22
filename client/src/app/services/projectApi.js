import { baseApi } from "./baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: ({ q }) => {
        return {
          url: q?.length > 0 ? `project?q=${q}` : "project",
          method: "GET",
        };
      },
      providesTags: ["AllProjects"],
    }),
    getSingleProject: builder.query({
      query: ({ id }) => {
        return {
          url: `project/${id}`,
          method: "GET",
        };
      },
      providesTags: ["SingleProject"],
    }),
    createProject: builder.mutation({
      query: ({ body }) => {
        return {
          url: "project/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllProjects", "SingleUser", "ProjectOfUser"],
    }),
    editProject: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `project/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: (result, error) =>
        result?.success ? ["SingleProject"] : [],
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => {
        return {
          url: `project/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [
        "AllProjects",
        "SingleUser",
        "ProjectOfUser",
        "SavedProjects",
      ],
    }),
    likeUnlikeProject: builder.mutation({
      query: ({ id }) => {
        return {
          url: `project/${id}/like`,
          method: "GET",
        };
      },
      invalidatesTags: [
        "AllProjects",
        "SingleProject",
        "ProjectOfUser",
        "SavedProjects",
      ],
    }),
    saveUnsaveProject: builder.mutation({
      query: ({ id }) => {
        return {
          url: `project/${id}/save`,
          method: "GET",
        };
      },
      invalidatesTags: [
        "AllProjects",
        "SingleProject",
        "ProjectOfUser",
        "SavedProjects",
      ],
    }),
    getComments: builder.query({
      query: ({ id }) => {
        return {
          url: `project/${id}/comment`,
          method: "GET",
        };
      },
      providesTags: ["AllComments"],
    }),
    addComment: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `project/${id}/comment`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [
        "AllProjects",
        "SingleProject",
        "AllComments",
        "ProjectOfUser",
        "SavedProjects",
      ],
    }),
    deleteComment: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `project/${id}/comment`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: [
        "AllProjects",
        "SingleProject",
        "AllComments",
        "ProjectOfUser",
        "SavedProjects",
      ],
    }),
    editComment: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `project/${id}/comment`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["AllComments"],
    }),
    ///
    getReadme: builder.query({
      query: ({ url }) => {
        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
  useLikeUnlikeProjectMutation,
  useSaveUnsaveProjectMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useGetReadmeQuery,
} = projectApi;
