import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../api/api";
import { Courses } from "../../../interfaces";

const courseAd: Courses[] = [];

// Fetch all courses
export const fetchCourses: any = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await baseUrl.get("courses");
    return response.data;
  }
);

// Add a new course
export const addCourse: any = createAsyncThunk(
  "courses/addCourse",
  async (course) => {
    const response = await baseUrl.post("courses", course);
    return response.data;
  }
);

// Edit a course
export const editCourse: any = createAsyncThunk(
  "courses/editCourse",
  async (course: Courses) => {
    const response = await baseUrl.put(`courses/${course.id}`, course);
    return response.data;
  }
);

// Delete a course
export const deleteCourse: any = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId) => {
    await baseUrl.delete(`courses/${courseId}`);
    return courseId;
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    course: courseAd,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.course = action.payload;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.course.push(action.payload);
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        const index = state.course.findIndex(
          (course) => course.id === action.payload.id
        );
        state.course[index] = action.payload;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.course = state.course.filter(
          (course) => course.id !== action.payload
        );
      });
  },
});

export default courseSlice.reducer;
