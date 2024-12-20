import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Users } from "../../../interfaces";
import baseUrl from "../../../api/api";

const userad: Users[] = [];

// Fetch all users
export const getUserAd: any = createAsyncThunk("user/getUserAd", async () => {
  const response = await baseUrl.get("users");
  return response.data;
});

// Search users
export const searchUsers: any = createAsyncThunk(
  "user/searchUsers",
  async (query: string) => {
    const response = await baseUrl.get(`users?name_like=${query}`);
    return response.data;
  }
);

// Sort users
export const sortUsers: any = createAsyncThunk(
  "user/sortUsers",
  async ({ order, field }: { order: string; field: string }) => {
    const response = await baseUrl.get(`users?_sort=${field}&_order=${order}`);
    return response.data;
  }
);

// Add a new user
export const addUser: any = createAsyncThunk(
  "user/addUser",
  async (user: Users) => {
    const response = await baseUrl.post("users", user);
    return response.data;
  }
);

// Lock/Unlock a user
export const toggleUserLock: any = createAsyncThunk(
  "user/toggleUserLock",
  async (id: number) => {
    const response = await baseUrl.get(`users/${id}`);
    const updatedUser = { ...response.data, status: !response.data.status };
    await baseUrl.put(`users/${id}`, updatedUser);
    return updatedUser;
  }
);

// Delete a user
export const deleteUser: any = createAsyncThunk(
  "user/deleteUser",
  async (id: number) => {
    await baseUrl.delete(`users/${id}`);
    return id;
  }
);

export const updateUserRole: any = createAsyncThunk(
  "users/updateRole",
  async (
    { userId, newRole }: { userId: number; newRole: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await baseUrl.patch(`users/${userId}`, {
        role: newRole,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userAdmin = createSlice({
  name: "userad",
  initialState: {
    user: userad,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAd.fulfilled, (state: any, action: any) => {
      state.user = action.payload;
    });
    builder.addCase(searchUsers.fulfilled, (state: any, action: any) => {
      state.user = action.payload;
    });
    builder.addCase(sortUsers.fulfilled, (state: any, action: any) => {
      state.user = action.payload;
    });
    builder.addCase(addUser.fulfilled, (state: any, action: any) => {
      state.user.push(action.payload);
    });
    builder.addCase(toggleUserLock.fulfilled, (state: any, action: any) => {
      const index = state.user.findIndex(
        (user: Users) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.user[index] = action.payload;
      }
    });
    builder.addCase(deleteUser.fulfilled, (state: any, action: any) => {
      state.user = state.user.filter(
        (user: Users) => user.id !== action.payload
      );
    });
    builder.addCase(updateUserRole.fulfilled, (state, action) => {
      const index = state.user.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.user[index] = action.payload;
      }
    });
  },
});

export default userAdmin.reducer;
