import store from "@/state-management/store/Store"

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch