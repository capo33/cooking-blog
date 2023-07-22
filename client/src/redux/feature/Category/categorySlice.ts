import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

import categoryServices from "./categoryServices";
import { Category, ICategoryData } from "../../../interfaces/CategoryInterface";

interface CategoryState {
  categories: Category[];
  category: Category | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Get categories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryServices.getAllCategories();
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Get category by slug
export const getCategoryBySlug = createAsyncThunk(
  "category/getCategoryBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await categoryServices.getCategoryBySlug(slug);
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

interface ICategoryCreate {
  categoryData: ICategoryData;
  token: string;
  toast: any;
  navigate: NavigateFunction;
  id?: string;
}

// Create category
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (
    { categoryData, token, toast, navigate }: ICategoryCreate,
    { rejectWithValue }
  ) => {
    try {
      const response = await categoryServices.createCategory(
        categoryData,
        token
      );
      navigate("/categories");
      toast.success(response?.message);
      console.log('response', response);
      
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Update category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (
    { id, categoryData, token, toast, navigate }: ICategoryCreate,
    { rejectWithValue }
  ) => {
    try {
      const response = await categoryServices.updateCategory(
        id as string,
        categoryData,
        token
      );

      navigate("/admin/allcategories");
      toast.success(response?.message);
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (
    {
      id,
      token,
      toast,
    }: // navigate,
    { id: string; token: string; toast: any },
    thunkAPI
  ) => {
    try {
      const response = await categoryServices.deleteCategory(
        id as string,
        token
      );
      // navigate("/");
      toast.success(response?.message);
      thunkAPI.dispatch(getAllCategories());
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Get all categories
    builder.addCase(getAllCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = actions.payload as Category[];
    });
    builder.addCase(getAllCategories.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Get a category by slug
    builder.addCase(getCategoryBySlug.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategoryBySlug.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.category = actions.payload;
    });
    builder.addCase(getCategoryBySlug.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Create a new category
    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.category = actions.payload;
    });
    builder.addCase(createCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Update a category
    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.category = actions.payload;
    });
    builder.addCase(updateCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Delete a category
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.category = actions.payload;
    });
    builder.addCase(deleteCategory.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export const { clearState } = categorySlice.actions;

export default categorySlice.reducer;
