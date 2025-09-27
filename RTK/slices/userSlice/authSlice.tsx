import { baseUrl } from "@/constant";
import { rootState } from "@/RTK/store";
import { AuthState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAuthUser = createAsyncThunk('authSlice/fetchAuthUser', async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`${baseUrl}/users/check`, {
            method: "GET",
            credentials: 'include', // Include cookies for authentication
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Handle 401 as a valid response (user not authenticated)
        if (res.status === 401) {
            const data = await res.json();
            return data; // Return { logIn: false }
        }

        if (!res.ok) {
            return rejectWithValue(`Server error: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error: any) {
        return rejectWithValue(error.message || 'Network error occurred');
    }
});



const initialState: AuthState = {

    user: null,
    logIn: false
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthUser.pending, (state) => {
                state.logIn = false
            })
            .addCase(fetchAuthUser.fulfilled, (state, action) => {

                state.logIn = action.payload.logIn;
                state.user = action.payload.user;
            })
            .addCase(fetchAuthUser.rejected, (state, action) => {
                state.logIn = false;
                state.user = null;
            });
    }
});


// Selectors
export const authState = (state: rootState) => state.auth;

export default authSlice.reducer;