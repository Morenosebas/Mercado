import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const storeApi = createApi({
    reducerPath: 'StoreApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/store/' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (product) => `user/${product}`,
        }),
    })
});


export const { useGetProductsStore, usePostProductsStore } = storeApi;


//configuracion de la store
export const { endpoints, reducerPath, reducer, middleware } = storeApi