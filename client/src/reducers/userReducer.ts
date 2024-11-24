import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserReducer{
    email:string;
    userId: string;
}

const initialState: UserReducer = {
    email:"",
    userId:"",
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserData: (state, action: PayloadAction<UserReducer>) => {
            state.email = action.payload.email;
            state.userId = action.payload.userId;
        },
    }
})

export const {setUserData} = userSlice.actions;
export default userSlice.reducer;