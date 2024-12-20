import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../api/api";
import { ExamSubjects } from "../../../interfaces";

const subjectAd: ExamSubjects[] = [];

// Fetch all subjects
export const fetchSubjects: any = createAsyncThunk(
  "subjects/fetchSubjects",
  async (id) => {
    const response = await baseUrl.get(`examSubjects?courseId=${id}`);
    return response.data;
  }
);

// Add a new subject
export const addSubject: any = createAsyncThunk(
  "subjects/addSubject",
  async (subject) => {
    const response = await baseUrl.post("examSubjects", subject);
    return response.data;
  }
);

// Edit a subject
export const editSubject: any = createAsyncThunk(
  "subjects/editSubject",
  async (subject: ExamSubjects) => {
    const response = await baseUrl.put(`examSubjects/${subject.id}`, subject);
    return response.data;
  }
);

// Delete a subject
export const deleteSubject: any = createAsyncThunk(
  "subjects/deleteSubject",
  async (subjectId) => {
    await baseUrl.delete(`examSubjects/${subjectId}`);
    return subjectId;
  }
);

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: {
    subject: subjectAd,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subject = action.payload;
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.subject.push(action.payload);
      })
      .addCase(editSubject.fulfilled, (state, action) => {
        const index = state.subject.findIndex(
          (subject) => subject.id === action.payload.id
        );
        state.subject[index] = action.payload;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.subject = state.subject.filter(
          (subject) => subject.id !== action.payload
        );
      });
  },
});

export default subjectsSlice.reducer;
