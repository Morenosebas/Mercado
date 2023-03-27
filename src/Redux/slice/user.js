import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { store } from "../store.config";

const loadState = () => {
    try {
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
        localStorage.setItem("state", serializedState);
    } catch {
        // ignore write errors
    }
};


const initialState = {
    session: loadState() ?? {
        username: "",
        isAuthenticated: false,
        createdDt: "",
        updatedDt: "",
        id: null,
        store: false,
    }
};




const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        initSession: (state, action) => {
            state.username = action.payload.username;
            state.createdDt = action.payload.createdDt;
            state.updatedDt = action.payload.updatedDt;
            state.id = action.payload.id;
            state.isAuthenticated = true;
            state.store = action.payload.store ? action.payload.store : false;
            saveState(state);
        },
        logoutSession: (state) => {
            state.username = "";
            state.isAuthenticated = false;
            state.createdDt = "";
            state.updatedDt = "";
            state.id = null;
            state.store = false;
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
            if (!loadState().isAuthenticated) {
                const response = await fetch("http://localhost:5000/api/user", {
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                const { isAuthenticated, requestUser } = data

                if (!isAuthenticated) {
                    store.dispatch(logoutSession());
                    localStorage.clear();
                    return isAuthenticated;
                } else {
                    store.dispatch(initSession({
                        username: requestUser.username,
                        createdDt: requestUser.createdAt,
                        updatedDt: requestUser.updatedAt,
                        id: requestUser._id,

                    }));
                    return isAuthenticated;
                }
            }
            return
        }
    )
);
export { persistedState };

export const { initSession, logoutSession } = sessionSlice.actions;

export default reducer;