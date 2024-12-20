import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../../interfaces";
import baseUrl from "../../../api/api";

const comments: Comment[] = [];

// Lấy tất cả các comment theo id đề thi
export const getCommentsById: any = createAsyncThunk(
  "comment/getCommentsById",
  async (examId) => {
    const response = await baseUrl.get(`comments?examId=${examId}`);
    return response.data;
  }
);

export const createComment: any = createAsyncThunk(
  "comment/createComment",
  async (comment) => {
    const response = await baseUrl.post("comments", comment);
    return response.data;
  }
);

const commentsUser = createSlice({
  name: "comment",
  initialState: {
    comment: comments,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsById.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comment.push(action.payload);
      });
  },
});

export default commentsUser.reducer;
