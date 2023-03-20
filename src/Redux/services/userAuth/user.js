import { createApi } from "@reduxjs/toolkit/dist/query";
import authBaseQuery from "./queryauth";
import { cache } from "swr"
const UserAuthApi = createApi({
  reducerPath: "userAuth",
  baseQuery: authBaseQuery,
  tagTypes: ["user"],
  endpoints: (builder) => ({
    logins: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: JSON.stringify(credentials)
      }),
      providesTags: (result) => result ? [{ type: "User", id: result.user }] : [],
    }),
    getUser: builder.query({
      query: (credentials) => {
        const user = cache.getQueryData("user");
        return { user: user?.username, email: user?.email, dateCreated: new Date(user?.created) };
      },
      keepUnusedDataFor:5,
    }),
    testApiConnection: builder.query({
      query: "/auth/profile",
    })
    ,
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: JSON.stringify(credentials)
      })
    })
    ,
    logout: builder.query({
      query: "/auth/logout",
    })
  })
});


export default UserAuthApi;