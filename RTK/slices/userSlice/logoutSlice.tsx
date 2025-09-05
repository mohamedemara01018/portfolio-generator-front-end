import { baseUrl } from "@/constant";
import { rootState } from "@/RTK/store";
import { logoutState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLogoutUser = createAsyncThunk('', async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`${baseUrl}/users/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
        if (!res.ok) {
            return rejectWithValue('failed to fetch logout')
        }
        const data = await res.json();
        return data
    } catch (error) {
        return rejectWithValue(error || 'unexpected error')
    }
})


const initialState: logoutState = {
    message: null,
    loading: null,
    error: null,
}
const logoutSlice = createSlice({
    name: 'logoutSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLogoutUser.fulfilled, (state, action) => {
                state.loading = true;
                state.message = action.payload.message
            })
            .addCase(fetchLogoutUser.rejected, (state, action) => {
                state.loading = true;
                state.error = String(action.payload)
            })
    }

})

//states
export const logoutUserState = (state: rootState) => state.logout;


export default logoutSlice.reducer