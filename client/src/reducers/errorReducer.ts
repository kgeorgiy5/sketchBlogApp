import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ErrorReducer {
    errorMessage:string | null;
}

const initialState: ErrorReducer = {
    errorMessage:null,
}

const errorSlice = createSlice({
    name:"error",
    initialState,
    reducers:{
        setErrorMessage: (state, action: PayloadAction<ErrorReducer>) => {
            state.errorMessage = action.payload.errorMessage;
        }
    }
});

export const {setErrorMessage} = errorSlice.actions;
export default errorSlice.reducer;
