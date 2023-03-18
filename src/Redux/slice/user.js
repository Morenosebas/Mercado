import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { store } from "../store.config";


const loadState = () => {
    try {
        console.log(localStorage.getItem("state"));
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        const state = JSON.parse(serializedState);
        if (
            state &&
            state.session &&
            typeof state.session === "object" &&
            !Array.isArray(state.session)
        ) {
            return state;
        }
        // si el contenido no coincide con la estructura actual, eliminar el contenido anterior
        localStorage.removeItem("state");
    } catch (err) {
        console.error("Error al cargar el estado del almacenamiento local", err);
    }
    // devolver el estado inicial si no se puede cargar el estado anterior
    return undefined;
};


const saveState = (state) => {
    try {
        const serializedState = JSON.stringify({ session: state }); // solo guardar el estado del slice "session"
        console.log("state: ", serializedState);
        localStorage.setItem("state", serializedState);
    } catch {
        // ignore write errors
    }
};


const initialState = {
    session: loadState() ?? {
        username: "",
        email: "",
        isAuthenticated: false,
        createdDt: "",
        updatedDt: "",
    }
};




const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        initSession: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.createdDt = action.payload.createdDt;
            state.updatedDt = action.payload.updatedDt;
            state.isAuthenticated = true;
            saveState(state);
        },
        logoutSession: (state) => {
            state.username = "";
            state.email = "";
            state.isAuthenticated = false;
            state.createdDt = "";
            state.updatedDt = "";
            saveState(state);
        },
    },
});

const persistedState = loadState();

const reducer = sessionSlice.reducer;

export const checkAuthState = createAsyncThunk(
    "session/checkAuthState",
    (
        async () => {

            const response = await fetch("http://localhost:5000/api/profile", {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            const { isAuthenticated } = data

            if (!isAuthenticated) {
                console.log(data)
                store.dispatch(logoutSession());
                localStorage.clear();
                return isAuthenticated;
            } else {
                console.log(data)
                return isAuthenticated;
            }
        })
);
export { persistedState };

export const { initSession, logoutSession } = sessionSlice.actions;

export default reducer;