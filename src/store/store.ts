import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import {companiesAPI} from "../services/CompanyServies";
import {usersAPI} from "../services/UserServies";



const rootReducer = combineReducers({
    userReducer,
    [companiesAPI.reducerPath]: companiesAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(companiesAPI.middleware, usersAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

