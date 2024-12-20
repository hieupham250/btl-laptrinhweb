import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../api/api";
import { Questions } from "../../../interfaces";

const questionUser: Questions[] = [];

// Fetch all courses
export const getQuestionUser: any = createAsyncThunk(
  "question/getUser",
  async (id) => {
    const response = await baseUrl.get(`questions?examId=${id}`);
    return response.data;
  }
);

const questionUsers = createSlice({
  name: "question",
  initialState: {
    userQuestion: questionUser,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestionUser.fulfilled, (state, action) => {
      state.userQuestion = action.payload;
    });
  },
});

export default questionUsers.reducer;
