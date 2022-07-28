import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import testCategoryApi from "../api/testCategoryApi";
export const PER_PAGE = 2;

export const getTestCategory = createAsyncThunk(
  "testCategory/fetched",
  async (query, thunkAPI) => {
    try {
      return await testCategoryApi.getAll(query);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const addCategory = createAsyncThunk(
  "testCategory/create",
  async (data, thunkAPI) => {
    try {
      return await testCategoryApi.create(data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const updateCategory = createAsyncThunk(
  "testCategory/update",
  async (data, thunkAPI) => {
    try {
      await testCategoryApi.updateById(data);
      return data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "testCategory/delete",
  async (data, thunkAPI) => {
    try {
      await testCategoryApi.deleteById(data);
      return data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const deleteSub = createAsyncThunk(
  "testCategory/delete",
  async (data, thunkAPI) => {
    try {
      await testCategoryApi.deleteSub(data);
      return data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const createSub = createAsyncThunk(
  "testCategory/createSub",
  async (data, thunkAPI) => {
    try {
      return await testCategoryApi.createSub(data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const updateSub = createAsyncThunk(
  "testCategory/updateSub",
  async (data, thunkAPI) => {
    try {
      await testCategoryApi.updateSub(data);
      return data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const moveSub = createAsyncThunk(
  "testCategory/moveSub",
  async (data, thunkAPI) => {
    try {
      await testCategoryApi.moveSub(data);
      return data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

const testCategorySlice = createSlice({
  name: "testCategory",
  initialState: {
    testCategory: [],
    categories: [],
    isLoading: false,
    pagination: {
      current_page: 1,
      total: 0,
      per_page: PER_PAGE,
    },
  },
  reducers: {},
  extraReducers: {
    [getTestCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTestCategory.fulfilled]: (state, action) => {
      state.testCategory = action.payload?.testCategory;
      state.categories = action.payload?.categories;
      state.pagination = action.payload?.pagination;
      state.isLoading = false;
    },
    [getTestCategory.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.testCategory.unshift(action.payload?.testCategory);
      state.isLoading = false;
    },
    [addCategory.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [updateCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.testCategory = state.testCategory.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        }
        return item;
      });
      state.isLoading = false;
    },
    [updateCategory.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [deleteCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.testCategory = state.testCategory.filter(
        (item) => item._id !== action.payload._id
      );
      state.isLoading = false;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [createSub.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createSub.fulfilled]: (state, action) => {
      console.log("createSub", action.payload);
      state.testCategory = state.testCategory.map((item) => {
        if (item._id === action.payload.subCategory.test_category_id) {
          item.sub_categories.unshift(action.payload.subCategory);
          console.log("item", item);
        }
        return item;
      });
      state.isLoading = false;
    },
    [createSub.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [deleteSub.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteSub.fulfilled]: (state, action) => {
      state.testCategory = state.testCategory.map((item) => {
        if (item._id === action.payload.test_category_id) {
          item.sub_categories = item.sub_categories.filter(
            (x) => x._id !== action.payload._id
          );
          console.log("item.sub_categories", item.sub_categories);
        }
        return item;
      });
      state.isLoading = false;
    },
    [deleteSub.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [updateSub.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateSub.fulfilled]: (state, action) => {
      state.testCategory = state.testCategory.map((item) => {
        if (item._id === action.payload.test_category_id) {
          item.sub_categories = item.sub_categories.map((x) => {
            if (x._id === action.payload._id) {
              return action.payload;
            }
            return x;
          });
        }
        return item;
      });
      state.isLoading = false;
    },
    [updateSub.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [moveSub.pending]: (state, action) => {
      state.isLoading = true;
    },
    [moveSub.fulfilled]: (state, action) => {
      state.testCategory = state.testCategory.map((item) => {
        if (item._id === action.payload.sub.test_category_id) {
          item.sub_categories = item.sub_categories.filter(
            (x) => x._id !== action.payload.sub._id
          );
        } else if (item._id === action.payload.new_parent_id) {
          item.sub_categories.unshift({
            ...action.payload.sub,
            test_category_id: action.payload.new_parent_id,
          });
        }
        return item;
      });
      state.isLoading = false;
    },
    [moveSub.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const testCategorySelector = (state) => state.testCategoryReducer;

export default testCategorySlice.reducer;
