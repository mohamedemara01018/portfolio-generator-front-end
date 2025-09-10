
import { baseUrl } from "@/constant";
import { rootState } from "@/RTK/store";
import { reSendCodeState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchResendCode = createAsyncThunk('resendCodeSlice/fetchResendCode', async (email, { rejectWithValue }) => {

    try {
        const res = await fetch(`${baseUrl}/users/reSendCode`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({ email: email }),
            credentials: "include",
        })
        if (!res.ok) {
            return rejectWithValue('failed to resend code')
        }
        const data = await res.json();
        return data
    } catch (error) {

    }
})


const initialState: reSendCodeState = {
    loading: null,
    error: null,
    message: null
}
const resendCodeSlice = createSlice({
    name: 'resendCodeSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResendCode.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchResendCode.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload.message
            })
            .addCase(fetchResendCode.rejected, (state, action) => {
                state.error = String(action.payload) || 'rejected in resend code'
            })
    }
})

//states

export const reSendCode = (state: rootState) => state.reSendCode;

export default resendCodeSlice.reducer