import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Project {
  projectId: string;
  name: string;
  description: string;
}

interface ProjectsData {
  projectData: Project[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: ProjectsData = {
  projectData: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchProjects = createAsyncThunk<
  Project[],
  void,
  { rejectValue: string }
>("projectState/fetchProjects", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ projects: Project[] }>(
      "http://localhost:8080/v1/project",
      {
        withCredentials: true,
      }
    );
    return response.data.projects;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

const projectSlice = createSlice({
  name: "projectState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.isLoading = false;
          state.projectData = action.payload;
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      });
  },
});

export default projectSlice.reducer;
