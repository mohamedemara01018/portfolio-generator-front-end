import { baseUrl } from "@/constant";
import { rootState } from "@/RTK/store";
import { FormDataLogin, initialStateLogin } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLoginUser = createAsyncThunk('loginSlice/fetchLoginUser', async (user: FormDataLogin, { rejectWithValue }) => {

    try {
        const res = await fetch(`${baseUrl}/users/login`, {
            method: "POST",
            credentials: 'include', // Include cookies
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        });
        if (!res.ok) {
            return rejectWithValue('failed to login')
        }
        const data = await res.json();
        return data

    } catch (error: any) {
        return rejectWithValue(error.messaga || 'unexpected error')
    }
})

const initialState: initialStateLogin = {
    loading: null,
    error: null,
    token: null
}
const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLoginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token
            })
            .addCase(fetchLoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = String(action.payload) || 'there some error'
            })
    }
})

//states
export const loginState = (state: rootState) => state.login;

export default loginSlice.reducer