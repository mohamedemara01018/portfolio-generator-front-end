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
    loading: null,
    error: null,
    isAuthenticated: false,
    user: null,
    logIn: false
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.logIn = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuthUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = action.payload.logIn;
                state.logIn = action.payload.logIn;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(fetchAuthUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.logIn = false;
                state.user = null;
                state.error = String(action.payload) || 'Authentication check failed';
            });
    }
});

// Actions
export const { logout, clearError } = authSlice.actions;

// Selectors
export const authState = (state: rootState) => state.auth;

export default authSlice.reducer;