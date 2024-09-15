import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTaskApi, fetchTasksApi, updateTaskApi } from "./taskAPI";

// Default categories that are always present
const defaultCategories = ["All", "Work", "Wishlist", "Personal", "Birthday"];

// function to update categories when creating a task
const updateCategories = (state, newCategory) => {
  if (newCategory && !state.categories.includes(newCategory)) {
    state.categories.push(newCategory);
  }
};

// function to calculate categories from the fetched tasks
const calculateCategoriesFromTasks = (tasks) => {
  const categories = [...defaultCategories];
  tasks.forEach((task) => {
    if (task.category && !categories.includes(task.category)) {
      categories.push(task.category);
    }
  });
  return categories;
};

// Create task
export const createTask = createAsyncThunk(
  "task/createTask",
  async ({ title, date, category, priority }, { dispatch, rejectWithValue }) => {
    try {
      const newTask = await createTaskApi({ title, date, category, priority });
      dispatch(fetchTasks())
      return newTask;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch tasks 
export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const tasks = await fetchTasksApi();
      return tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update task 
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const updatedTask = await updateTaskApi({ id, data });
      return updatedTask;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Task slice with category management
const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    categories: defaultCategories,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        // Update categories when a new task is created
        updateCategories(state, action.payload.category);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        // Calculate categories from fetched tasks at the start
        state.categories = calculateCategoriesFromTasks(action.payload);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
