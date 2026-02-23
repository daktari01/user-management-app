import store from "@/state-management/store/Store"

export interface User {
  id: number,
  name: string,
  email: string,
}

export interface UserState {
  users: User[];
  singleUser: User | null;
  loadingAll: boolean;
  loadingSingle: boolean;
  errorAll: string | null;
  errorSingle: string | null;
}

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch