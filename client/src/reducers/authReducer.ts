import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthReducer {
    isAuthenticated: boolean;
}

const initialState: AuthReducer = {
    isAuthenticated: false,
}

const authSlice = createSlice({
    name:"isAuthenticated",
    initialState,
    reducers:{
        setIsAuthenticated: (state, action: PayloadAction<AuthReducer>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
        }
    }
})

export const {setIsAuthenticated} = authSlice.actions;
export default authSlice.reducer;