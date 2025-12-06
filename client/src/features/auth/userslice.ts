import { createSlice } from "@reduxjs/toolkit";

//either a user is logged in or logout
export type UserState = {
    token: string | null;
    user: {
        userid: number;
        first_name: string;
        last_name: string;
        email: string;
        
        role: string;
    } | null;
}

//no user in the system
const initialState: UserState = {
    token: null,
    user: null
}

const userSlice = createSlice({ // createSlice is a function that creates a slice of the Redux store- a slice in simple terms is a part of the store that contains a specific piece of state and the reducers that update that state.
    name: 'user',
    initialState,
    reducers: { //a reducer is a function that takes the current state and an action, and returns a new state
        loginSuccess: (state, action) => {
            state.token = action.payload.token; // the token is set when the user logs in successfully
            state.user = action.payload.user // the user is set when the user logs in successfully
        },
        logOut: (state) => {
            state.token = null;
            state.user = null;
        }
    }
})


export const { loginSuccess, logOut } = userSlice.actions
export default userSlice.reducer