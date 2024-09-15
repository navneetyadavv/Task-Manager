import express from "express";

import { createTask, deleteTask, fetchTasks, updateTask } from "../controller/taskController.js";

const taskRouter = express.Router();

taskRouter.post('/create-task', createTask)
taskRouter.get('/fetch-tasks', fetchTasks)
taskRouter.patch('/update-task/:id', updateTask)
taskRouter.delete('/delete-task/:id', deleteTask)

export default taskRouter;