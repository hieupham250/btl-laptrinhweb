import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../api/api";
import { Exams } from "../../../interfaces";

const examUser: Exams[] = [];

// Lấy tất cả các bài kiểm tra
export const getExamUser: any = createAsyncThunk(
  "exam/getUser",
  async (id: string) => {
    const response = await baseUrl.get(`exams?examSubjectId=${id}`);
    return response.data;
  }
);

// Truyền ID cho câu hỏi để lấy thông tin
export const getExamUserId: any = createAsyncThunk(
  "exam/getUserId",
  async (id: string) => {
    const response = await baseUrl.get(`exams/${id}`);
    return response.data;
  }
);

// Tìm kiếm bài kiểm tra
export const searchExams: any = createAsyncThunk(
  "exam/searchExams",
  async (query: string) => {
    const response = await baseUrl.get(`exams?title_like=${query}`);
    return response.data;
  }
);

const examUsers = createSlice({
  name: "exam",
  initialState: {
    userExam: examUser,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExamUser.fulfilled, (state, action) => {
      state.userExam = action.payload;
    });
    builder.addCase(searchExams.fulfilled, (state, action) => {
      state.userExam = action.payload;
    });
    builder.addCase(getExamUserId.fulfilled, (state, action) => {
      state.userExam = action.payload;
    });
  },
});

export default examUsers.reducer;
