import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Courses } from "../../../interfaces";
import baseUrl from "../../../api/api";

const courseUser: Courses[] = [];

// Lấy tất cả các khóa học
export const getCoursesUser: any = createAsyncThunk(
  "course/getUser",
  async () => {
    const response = await baseUrl.get("courses");
    return response.data;
  }
);

// Tìm kiếm khóa học
export const searchCourses: any = createAsyncThunk(
  "course/searchCourses",
  async (query: string) => {
    const response = await baseUrl.get(`courses?title_like=${query}`);
    return response.data;
  }
);

const courseUsers = createSlice({
  name: "course",
  initialState: {
    userCourse: courseUser,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoursesUser.fulfilled, (state, action) => {
      state.userCourse = action.payload;
    });
    builder.addCase(searchCourses.fulfilled, (state, action) => {
      state.userCourse = action.payload;
    });
  },
});

export default courseUsers.reducer;
