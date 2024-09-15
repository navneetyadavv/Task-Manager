import axios from "axios";

// Creates a new task by sending a POST request to the server.
export const createTaskApi = async ({ title, date, category, priority }) => {
  const response = await axios.post("http://localhost:3000/task/create-task", {
    title,
    date,
    category,
    priority,
  });
  return response.data;
}; 

// Fetches all tasks by sending a GET request to the server.
export const fetchTasksApi = async () => {
  const response = await axios.get("http://localhost:3000/task/fetch-tasks");
  return response.data;
};


// Updates an existing task by sending a PATCH request to the server.
export const updateTaskApi = async ({ id, data }) => {
  try {
    const response = await axios.patch(`http://localhost:3000/task/update-task/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
