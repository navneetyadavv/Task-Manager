import express from "express";

import { createTask, fetchTasks, updateTask } from "../controller/taskController.js";

const taskRouter = express.Router();

taskRouter.post('/create-task', createTask)
taskRouter.get('/fetch-tasks', fetchTasks)
taskRouter.patch('/update-task/:id', updateTask)

export default taskRouter;