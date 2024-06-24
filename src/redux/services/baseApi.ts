import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getAllContact: builder.query({
      query: () => ({
        url: "/get-contact",
        method: "GET",
      }),
      providesTags: ["contact"],
    }),
    getSingleContact: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return {
          data: response.data,
        } 
      },
      providesTags: ["contact"],
    }),
    delateContact: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ["contact"],
    }),
    editContact: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: "PATCH",
        body: data.status,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetAllContactQuery,
  useDelateContactMutation,
  useEditContactMutation,
  useGetSingleContactQuery,
} = baseApi;
