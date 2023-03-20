import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const authBaseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        headers.set("Credentials", "include")
        return headers;
    },
    credentials: "include",

})

export default authBaseQuery;