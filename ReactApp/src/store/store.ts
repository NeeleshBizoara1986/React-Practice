import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice'
import { thunk } from "redux-thunk";
import { loggerMiddleware } from "./loggerMiddleware";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        // data: dataReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(loggerMiddleware),
});


// Type helpers for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
