import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { usersAPI } from "../features/auth/userAPIs";
import { loginAPI } from "../features/auth/loginAPIs";
import userSlice from "../features/auth/userslice";
import { projectsAPI } from "../features/projects/projectAPI";
import { bugsAPI } from "../features/bugs/bugsAPI";
import { authAPI } from "../features/auth/authAPI";
import { createUserAPI } from "../features/auth/creatuserAPI";
import { commentsAPI } from "../features/commentsAPI/commentAPI";


const persistConfig = {
  key: "bugstore",
  version: 1,
  storage,
  whitelist: ["user"], // Only persist the user and profile slices
};

const rootReducer = combineReducers({
  [usersAPI.reducerPath]: usersAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  [projectsAPI.reducerPath]: projectsAPI.reducer,
  [bugsAPI.reducerPath]: bugsAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [createUserAPI.reducerPath]: createUserAPI.reducer,
  [commentsAPI.reducerPath]: commentsAPI.reducer,
  user: userSlice,

});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(usersAPI.middleware)
      .concat(loginAPI.middleware)
      .concat(projectsAPI.middleware) // required for update/delete to work
      .concat(bugsAPI.middleware)
      .concat(authAPI.middleware)
      .concat(createUserAPI.middleware)
      .concat(commentsAPI.middleware)
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
