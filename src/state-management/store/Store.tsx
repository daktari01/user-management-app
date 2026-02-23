import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/state-management/features/users-slice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  }
})

export default store;