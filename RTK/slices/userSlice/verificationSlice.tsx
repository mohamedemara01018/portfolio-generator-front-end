import { baseUrl } from "@/constant";
import { rootState } from "@/RTK/store";
import { verificationData, verificationState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchVerifyCode = createAsyncThunk('verificationSlice/fetchVerifyCode', async (verificationData: verificationData, { rejectWithValue }) => {

    try {
        const res = await fetch(`${baseUrl}/users/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(verificationData),
            credentials: 'include',
        });
        if (!res.ok) {
            return rejectWithValue('failed to verify code');
        }
        const data = await res.json();
        return data

    } catch (error) {
        return rejectWithValue('unexpected error')
    }
})

const initialState: verificationState = {
    loading: null,
    error: null,
    message: null
}

const verificationSlice = createSlice({
    name: "verificationSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => [
        builder
            .addCase(fetchVerifyCode.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVerifyCode.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(fetchVerifyCode.rejected, (state, action) => {
                state.error = String(action.payload) || 'failed';
            })
    ]
})
//states 
export const verificationCodeState = (state: rootState) => state.verification;

export default verificationSlice.reducer

