import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/theme/themeSlice";


export const store = configureStore({
    reducer: {
        theme: themeSlice,
    }
})

export type rootState = ReturnType<typeof store.getState>;
export type appdispatch = ReturnType<typeof store.dispatch>;