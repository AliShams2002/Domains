import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const domainApi = createApi({
    reducerPath: 'domainApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://6797aa2bc2c861de0c6d964c.mockapi.io/domain'}),
    tagTypes: ['Domains'],
    endpoints: (builder) => ({
        getAllDomains : builder.query({
            query: () => ({
                method: 'GET'
                
            }),providesTags: ['Domains']
        }),
        getDomain : builder.mutation({
            query: ({id}) => ({
                url: `/${id}`,
                method: 'GET',
            }),invalidatesTags: ['Domains']
        }),
        updateDomain : builder.mutation({
            query: ({data}) => ({
                url: `/${data.id}`,
                method: 'PUT',
                body: data
            }),invalidatesTags: ['Domains']
        }),
        addDomain : builder.mutation({
            query: ({data}) => ({
                method: 'POST',
                body: data
            }),invalidatesTags: ['Domains']
        }),
        deleteDomain : builder.mutation({
            query: ({id}) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),invalidatesTags: ['Domains']
        })
    })
})



export const {useGetAllDomainsQuery, useGetDomainMutation, useAddDomainMutation, useUpdateDomainMutation, useDeleteDomainMutation} = domainApi;