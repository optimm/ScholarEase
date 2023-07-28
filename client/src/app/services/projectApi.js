import { baseApi } from "./baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: ({ q }) => {
        return {
          url: q?.length > 0 ? `scholarship?q=${q}` : "scholarship",
          method: "GET",
        };
      },
      providesTags: ["AllProjects"],
    }),
    getSingleProject: builder.query({
      query: ({ id }) => {
        return {
          url: `scholarship/${id}`,
          method: "GET",
        };
      },
      providesTags: ["SingleProject"],
    }),
    createProject: builder.mutation({
      query: ({ body }) => {
        return {
          url: "scholarship/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllProjects", "SingleUser", "ProjectOfUser"],
    }),
    editProject: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `scholarship/${id}`,
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
          url: `scholarship/${id}`,
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
          url: `scholarship/${id}/upvote`,
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
          url: `scholarship/${id}/save`,
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
          url: `scholarship/${id}/comment`,
          method: "GET",
        };
      },
      providesTags: ["AllComments"],
    }),
    addComment: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `scholarship/${id}/comment`,
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
          url: `scholarship/${id}/comment`,
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
          url: `scholarship/${id}/comment`,
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
