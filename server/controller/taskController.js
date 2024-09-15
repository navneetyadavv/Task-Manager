import Task from "../model/task.js";

// Controller to create a new task
export const createTask = async (req, res) => {
  try {
    const { title, date, category, priority } = req.body;

    const task = new Task({
      title,
      date: date || null,
      category: category || null,
      priority: priority || null,
    });

    await task.save();

    res.status(201).json({
      message: "Task created successfully!",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
      error: error.message,
    });
  }
};

// Controller to fetch all tasks
export const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

// Controller to update an existing task
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
