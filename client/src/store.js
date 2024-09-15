import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './features/tab/tabSlice';
import taskReducer from './features/task/taskSlice'

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    task: taskReducer
  },
});

export default store;
