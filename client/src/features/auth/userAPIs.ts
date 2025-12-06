
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiDomain } from "../../utils/ApiDomain";


export type TUser = {
    message: string
    userid: number
    first_name: string
    last_name: string
    email: string
    phone_number: string
    password_hash: string
    role: string
    isVerified: boolean
}


// User creation

export const usersAPI = createApi({ // sets up API endpoints for user management - creating users and verifying them etc
    reducerPath: 'usersAPI', //this is the key in the store where the API state will be stored - name of the API in the store
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        createUsers: builder.mutation<{ message: string }, Partial<TUser>>({
            query: (newUser) => ({
                url: '/users',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users'] // invalidates the cache for the Users tag when a new user is created
        }),
        verifyUser: builder.mutation<{ message: string }, { email: string, code: string }>({
            query: (data) => ({
                url: '/verify',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users']
        }),
        getUsers: builder.query<TUser[], void>({
            query: () => '/users',
            providesTags: ['Users']
        }),
        updateUserRole: builder.mutation<TUser, Partial<TUser> & { id: number }>({
            query: (user) => ({
                url: `/users/role/${user.id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['Users']
        }),
        updateUserProfile: builder.mutation<TUser, Partial<TUser> & { id: number }>({
            query: (user) => ({
                url: `/users/profile/${user.id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['Users']
        }),
        getUserById: builder.query<TUser, number>({
            query: (id) => `/users/${id}`,
        }),



    })
})