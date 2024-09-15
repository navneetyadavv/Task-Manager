# Task Manager

Welcome to Task Manager! This is a handy app built with React and Vite to help you keep track of your tasks. Whether it's something you need to do today, something coming up, or something you missed, Task Manager has got you covered.

## What Can You Do?

- **Organize Your Tasks**: Tasks are sorted into "Today", "Upcoming", and "Past" sections.
- **Filter Tasks**: Easily filter tasks by categories like "All", "Work", "Wishlist", "Personal", and "Birthday".
- **Add New Tasks**: Quickly add new tasks with our simple task creation modal.
- **Navigate Easily**: Use the sidebar to navigate through different sections of the app.

## Getting Started

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/yourusername/task-manager.git
    ```
2. **Go to the Project Directory**:
    ```sh
    cd task-manager/client
    ```
3. **Install Dependencies**:
    ```sh
    npm install
    ```
4. **Run the App**:
    ```sh
    npm run dev
    ```

## How to Use

- **Dashboard**: This is your main view where you can see tasks categorized into "Upcoming", "Today", and "Past".
- **Task List**: Depending on what section and category you choose, you'll see a list of relevant tasks.
- **Add Tasks**: Click on the task creation button to add new tasks.
- **Sidebar**: Use the sidebar to switch between different sections and categories.

/**
 * Dashboard Component
 *
 * This is the main dashboard of the Task Manager app. It shows tasks divided into "Upcoming", "Today", and "Past".
 * You can also toggle the sidebar and open the task creation modal from here.
 *
 * Props: None
 *
 * Usage:
 * ```jsx
 * <Dashboard />
 * ```
 */


/**
 * TaskList Component
 *
 * This component displays a list of tasks based on the selected section (Today, Upcoming, Past) and category.
 * It pulls tasks from the Redux store and filters them accordingly.
 *
 * Props:
 * - selectedCategory (string): The category of tasks to display.
 *
 * Usage:
 * ```jsx
 * <TaskList selectedCategory="Work" />
 * ```
 */

// Default categories that are always present
const defaultCategories = ["All", "Work", "Wishlist", "Personal", "Birthday"];

/**
 * taskSlice
 *
 * This slice manages the state of tasks in the Redux store.
 * It includes actions and reducers for adding, updating, and deleting tasks.
 *
 * State:
 * - tasks (array): List of tasks.
 * - categories (array): List of task categories.
 *
 * Actions:
 * - addTask: Adds a new task.
 * - updateTask: Updates an existing task.
 * - deleteTask: Deletes a task.
 *
 * Usage:
 * ```js
 * import { useDispatch, useSelector } from 'react-redux';
 * import { addTask, updateTask, deleteTask } from './taskSlice';
 * ```
 */
