import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api} from "@/api/api"
import {User} from "@/types";
import {UserState} from "@/types";

const initialState: UserState = {
  users: [],
  singleUser: null,
  loadingAll: false,
  loadingSingle: false,
  errorAll: null,
  errorSingle: null,

}

// Fetch all users
export const fetchUsers = createAsyncThunk<User[]>(
    "user/fetchUsers", async (_, {rejectWithValue}) => {
      try {
        const response = await api.get<User[]>("/users");
        return response.data;
      } catch(error: any) {
        return rejectWithValue(error);
      }
    }
)

// Fetch single user
export const fetchSingleUserById = createAsyncThunk<User, number, {rejectValue: string}>("users/fetchById", async (userId, {rejectWithValue}) => {
  try {
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error)
  }
})

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchUsers.pending, (state) => {
          state.loadingAll = true;
          state.errorAll = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
          state.loadingAll = false;
          state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
          state.loadingAll = false;
          state.errorAll = action.payload ?? "Unknown error";
        })

    // Single user
        .addCase(fetchSingleUserById.pending, (state) => {
          state.loadingSingle = true;
          state.errorSingle = null;
        })
        .addCase(fetchSingleUserById.fulfilled, (state, action: PayloadAction<User>) => {
          state.loadingSingle = false;
          state.singleUser = action.payload;
        })
        .addCase(fetchSingleUserById.rejected, (state, action: PayloadAction<any>) => {
          state.loadingSingle = false;
          state.errorSingle = action.payload ?? "Unknown error";
        })
  }
})

export default userSlice;