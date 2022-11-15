import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICompany} from "../models/ICompany";


export const companiesAPI = createApi({
    reducerPath: 'companiesAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Company'],
    endpoints: (build) => ({
        fetchAllCompanies: build.query<ICompany[], number>({
            query: (page = 1) => ({
                url: `/companies`,
                params: {
                    _page: page
                }
            }),
            providesTags: result => ['Company']
        }),
        createCompany: build.mutation<ICompany, ICompany>({
            query: (company) => ({
                url: `/companies`,
                method: 'POST',
                body: company
            }),
            invalidatesTags: ['Company']
        }),
        updateCompany: build.mutation<ICompany, ICompany>({
            query: (company) => ({
                url: `/companies/${company.id}`,
                method: 'PUT',
                body: company
            }),
            invalidatesTags: ['Company']
        }),
        deleteCompany: build.mutation<ICompany, ICompany>({
            query: (company) => ({
                url: `/companies/${company.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Company']
        }),
    })
})