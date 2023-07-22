import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/`,
    credentials: "include",
  }),
  tagTypes: [
    "SingleUser",
    "AllUsers",
    "Followers",
    "AllProjects",
    "SingleProject",
    "AllComments",
    "CheckAuth",
    "ProjectOfUser",
    "SavedProjects",
  ],
  endpoints: () => ({}),
});
