import { baseUrl } from "@/constant";
import { rootState } from "@/RTK/store";
import { initialStateRegister } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export const fetchRegisterUser = createAsyncThunk('registerSlice/fetchRegisterUser', async (user: FormData, { rejectWithValue }) => {

    try {
        const res = await fetch(`${baseUrl}/users/register`, {
            method: "POST",
            credentials: 'include', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        if (!res.ok) {
            return rejectWithValue('user exist please write a new Email')
        }
        return await res.json();
    } catch (error) {
        return rejectWithValue(error)
    }
})

const initialState: initialStateRegister = {
    loading: null,
    error: null,
    user: null
};

const registerSlice = createSlice({
    name: "registerSlice",
    initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder
            .addCase(fetchRegisterUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRegisterUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.newUser;
            })
            .addCase(fetchRegisterUser.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

//states
export const registerState = (state: rootState) => state.register;
//default
export default registerSlice.reducer;