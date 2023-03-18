import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const clientApi = createApi({
    reducerPath: 'clientApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/client/' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: "car",
        }),

    })
});


export const { useGetProductUser } = clientApi;


//configuracion de la store
export const { endpoints, reducerPath, reducer, middleware } = clientApi