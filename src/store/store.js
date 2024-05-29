import { configureStore } from "@reduxjs/toolkit";
import { authSlice, calendarSlice, uiSlice } from "./";

export const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware(
        {
            serializableCheck: false
        }
    ),
    reducer: {
        // Here we will add our reducers
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    }
})