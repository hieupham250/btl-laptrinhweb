import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../api/api";
import { Questions } from "../../../interfaces";

const questionsAd: Questions[] = [];

// Fetch all questions
export const fetchQuestions: any = createAsyncThunk(
  "questions/fetchQuestions",
  async (id) => {
    const response = await baseUrl.get(`questions?examId=${id}`);
    return response.data;
  }
);

// Add a new question
export const addQuestion: any = createAsyncThunk(
  "questions/addQuestion",
  async (question) => {
    const response = await baseUrl.post("questions", question);
    return response.data;
  }
);

// Edit a question
export const editQuestion: any = createAsyncThunk(
  "questions/editQuestion",
  async (question: Questions) => {
    const response = await baseUrl.put(`questions/${question.id}`, question);
    return response.data;
  }
);

// Delete a question
export const deleteQuestion: any = createAsyncThunk(
  "questions/deleteQuestion",
  async (questionId) => {
    await baseUrl.delete(`questions/${questionId}`);
    return questionId;
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    question: questionsAd,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.question = action.payload;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.question.push(action.payload);
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        const index = state.question.findIndex(
          (question) => question.id === action.payload.id
        );
        state.question[index] = action.payload;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.question = state.question.filter(
          (question) => question.id !== action.payload
        );
      });
  },
});

export default questionsSlice.reducer;
