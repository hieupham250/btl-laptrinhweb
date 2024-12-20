import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExamSubjects } from "../../../interfaces";
import baseUrl from "../../../api/api";

const subjectUser: ExamSubjects[] = [];

// Lấy tất cả các đối tượng
export const getSubjectUser: any = createAsyncThunk(
  "examSubjects/getUser",
  async (id) => {
    const response = await baseUrl.get(`examSubjects?courseId=${id}`);
    return response.data;
  }
);

// Tìm kiếm chủ đề
export const searchSubjects: any = createAsyncThunk(
  "examSubjects/searchSubjects",
  async (query: string) => {
    const response = await baseUrl.get(`examSubjects?title_like=${query}`);
    return response.data;
  }
);

const subjectUsers = createSlice({
  name: "subject",
  initialState: {
    userSubject: subjectUser,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubjectUser.fulfilled, (state, action) => {
      state.userSubject = action.payload;
    });
    builder.addCase(searchSubjects.fulfilled, (state, action) => {
      state.userSubject = action.payload;
    });
  },
});

export default subjectUsers.reducer;
