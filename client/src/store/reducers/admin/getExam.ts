import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../api/api";
import { Exams } from "../../../interfaces";

const examAd: Exams[] = [];

// Fetch all exams
export const fetchExams: any = createAsyncThunk(
  "exams/fetchExams",
  async (id) => {
    const response = await baseUrl.get(`exams?examSubjectId=${id}`);
    return response.data;
  }
);

// Add a new exam
export const addExam: any = createAsyncThunk("exams/addExam", async (exam) => {
  const response = await baseUrl.post("exams", exam);
  return response.data;
});

// Edit an exam
export const editExam: any = createAsyncThunk(
  "exams/editExam",
  async (exam: Exams) => {
    const response = await baseUrl.put(`exams/${exam.id}`, exam);
    return response.data;
  }
);

// Delete an exam
export const deleteExam: any = createAsyncThunk(
  "exams/deleteExam",
  async (examId) => {
    await baseUrl.delete(`exams/${examId}`);
    return examId;
  }
);

const examsSlice = createSlice({
  name: "exams",
  initialState: {
    exam: examAd,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.exam = action.payload;
      })
      .addCase(addExam.fulfilled, (state, action) => {
        state.exam.push(action.payload);
      })
      .addCase(editExam.fulfilled, (state, action) => {
        const index = state.exam.findIndex(
          (exam) => exam.id === action.payload.id
        );
        state.exam[index] = action.payload;
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.exam = state.exam.filter((exam) => exam.id !== action.payload);
      });
  },
});

export default examsSlice.reducer;
