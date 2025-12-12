import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


// User state type
export interface User {
  userid: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  avatar?: string;      // optional, can be generated locally
  created_at?: string;  // optional
}

export interface UserState {
  token: string | null;
  user: User | null;
}


// Initial state

const initialState: UserState = {
  token: null,
  user: null,
};


// Slice

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Login
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    //  Logout
    logOut: (state) => {
      state.token = null;
      state.user = null;
    },

    //  Update user info locally
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});


// Exports

export const { loginSuccess, logOut, updateUser } = userSlice.actions;
export default userSlice.reducer;
