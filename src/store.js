import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/autSlice'

const store = configureStore ({
    reducer: {
        auth: authReducer
    },
});

export default store;
