import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/theme/themeSlice";
import registerSlice from './slices/userSlice/registerSlice'
import loginSlice from './slices/userSlice/loginSlice'
import authSlice from './slices/userSlice/authSlice'
import logoutSlice from './slices/userSlice/logoutSlice'
export const store = configureStore({
    reducer: {
        theme: themeSlice,
        register: registerSlice,
        login: loginSlice,
        auth: authSlice,
        logout: logoutSlice,
    }
})

export type rootState = ReturnType<typeof store.getState>;
export type appdispatch = typeof store.dispatch;