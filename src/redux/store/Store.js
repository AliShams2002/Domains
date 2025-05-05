import { configureStore } from "@reduxjs/toolkit";
import domainsSlice from "../DomainsReducer";


const store = configureStore({
    reducer: {
        domains: domainsSlice
    }
})

export default store;