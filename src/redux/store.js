import { configureStore } from "@reduxjs/toolkit";
import  checkersSlice  from "./checkersSlice";

export const store = configureStore({
    reducer: {
        checkers: checkersSlice
    },
})

