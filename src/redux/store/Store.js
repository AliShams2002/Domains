import { configureStore } from "@reduxjs/toolkit";
import { domainApi } from "../DomainsReducer";


export const store = configureStore({
    reducer: {
      [domainApi.reducerPath]: domainApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(domainApi.middleware),
  })

export type AppDispatch = typeof store.dispatch;