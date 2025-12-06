
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { usersAPI } from "../features/auth/userAPIs";
import { loginAPI } from "../features/auth/loginAPIs";
import userSlice from '../features/auth/userslice'



const persistConfig = {
    key: 'bugstore',
    version: 1,
    storage,
    whitelist: ['user']// Only persist the user slice - this means only the user state will be saved in local storage
}

const rootReducer = combineReducers({ //combining all reducers into one root reducer
    [usersAPI.reducerPath]: usersAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    
    user: userSlice
})

export const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
        .concat(usersAPI.middleware)
        .concat(loginAPI.middleware)
       
    // 
})

export const persistedStore = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
