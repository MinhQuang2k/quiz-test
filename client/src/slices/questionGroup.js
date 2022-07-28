import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionGroupApi from "../api/questionGroupApi";
export const PER_PAGE = 2;

export const getQuestionGroups = createAsyncThunk(
  "questionGroups/fetched",
  async (query, thunkAPI) => {
    try {
      return await questionGroupApi.getAll(query);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const addQuestionGroup = createAsyncThunk(
  "questionGroups/Added",
  async (data, thunkAPI) => {
    try {
      const response = await questionGroupApi.create(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const deleteQuestionGroup = createAsyncThunk(
  "questionGroups/Deleted",
  async (id, thunkAPI) => {
    try {
      const response = await questionGroupApi.deleteById(id);
      return response;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const updateQuestionGroup = createAsyncThunk(
  "questionGroups/Update",
  async (data, thunkAPI) => {
    try {
      await questionGroupApi.updateById(data);

      return data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

const questionGroupsSlice = createSlice({
  name: "questionGroups",
  initialState: {
    questionGroups: [],
    isLoading: false,
    pagination: {
      current_page: 1,
      total: 0,
      per_page: PER_PAGE,
    },
  },
  reducers: {},
  extraReducers: {
    [getQuestionGroups.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getQuestionGroups.fulfilled]: (state, action) => {
      state.questionGroups = action.payload?.questionGroups;
      state.pagination = action.payload?.pagination;
      state.isLoading = false;
    },
    [getQuestionGroups.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addQuestionGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addQuestionGroup.fulfilled]: (state, action) => {
      state.questionGroups.unshift(action.payload?.questionGroup);
      state.isLoading = false;
    },
    [addQuestionGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [deleteQuestionGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteQuestionGroup.fulfilled]: (state, action) => {
      state.questionGroups = state.questionGroups.filter(
        (qG) => qG._id !== action.payload?.questionGroup?._id
      );
      state.isLoading = false;
    },
    [deleteQuestionGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [updateQuestionGroup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateQuestionGroup.fulfilled]: (state, action) => {
      state.questionGroups = state.questionGroups.map((qG) =>
        qG._id === action.payload._id ? action.payload : qG
      );
      state.isLoading = false;
    },
    [updateQuestionGroup.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const questionGroupsSelector = (state) => state.questionGroupReducer;

export default questionGroupsSlice.reducer;
