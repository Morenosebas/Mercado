import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { store } from "../store.config";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    const serializedState2 = sessionStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    const cart = JSON.parse(serializedState2);
    console.log("states: ", state);
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
    const serializedState2 = JSON.stringify({ cart: state.cart });
    localStorage.setItem("state", serializedState);
    sessionStorage.setItem("cart", serializedState2);
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
    storeS: false,
    cart: [],
  },
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
      state.storeS = action.payload.storeS || false;
      state.isAuthenticated = true;
      saveState(state);
    },
    createShop: (state, action) => {
      state.storeS = action.payload.storeS || false;
    },
    logoutSession: (state) => {
      state.username = "";
      state.isAuthenticated = false;
      state.createdDt = "";
      state.updatedDt = "";
      state.id = null;
      state.storeS = false;
      saveState(state);
    },
    addCart: (state, action) => {
      state.cart = action.payload.cart;
      saveState(state);
    },
  },
});

const persistedState = loadState();

const reducer = sessionSlice.reducer;

export const checkAuthState = createAsyncThunk(
  "session/checkAuthState",
  async () => {
    if (loadState().session.isAuthenticated) {
      const response = await fetch("http://localhost:5000/api/user", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch(() => {
        store.dispatch(logoutSession());
        localStorage.clear();
      });
      const data = await response.json();
      const { isAuthenticated, requestUser } = data;
      if (!isAuthenticated) {
        store.dispatch(logoutSession());
        localStorage.clear();
        return isAuthenticated;
      } else {
        store.dispatch(
          initSession({
            username: requestUser.username,
            createdDt: requestUser.createdAt,
            updatedDt: requestUser.updatedAt,
            id: requestUser._id,
            storeS: requestUser.store,
          })
        );
        return isAuthenticated;
      }
    }
    console.log("no hay sesion iniciada");
    return;
  }
);
export { persistedState };

export const { initSession, logoutSession, createShop, addCart } =
  sessionSlice.actions;

export default reducer;
