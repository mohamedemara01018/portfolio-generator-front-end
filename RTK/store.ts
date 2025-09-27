import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/theme/themeSlice";
import registerSlice from './slices/userSlice/registerSlice'
import loginSlice from './slices/userSlice/loginSlice'
import authSlice from './slices/userSlice/authSlice'
import logoutSlice from './slices/userSlice/logoutSlice'
import verificationSlice from './slices/userSlice/verificationSlice'
import reSendCodeSlice from './slices/userSlice/resendCodeSlice'
import templateDataSlice from './slices/templateSlice/templateDataSlice'
export const store = configureStore({
    reducer: {

        //users
        theme: themeSlice,
        register: registerSlice,
        login: loginSlice,
        auth: authSlice,
        logout: logoutSlice,
        verification: verificationSlice,
        reSendCode: reSendCodeSlice,

        //templates
        templateDataOne: templateDataSlice
    }
})

export type rootState = ReturnType<typeof store.getState>;
export type appdispatch = typeof store.dispatch;