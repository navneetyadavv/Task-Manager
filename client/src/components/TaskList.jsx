import React, { useEffect } from "react";
import Task from "./Task";
import styles from "./TaskList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask } from "../features/task/taskSlice";
import moment from "moment";


const TaskList = ({ section }) => {
  
  const dispatch = useDispatch();

  // Get tasks, loading state, and error state from the Redux store
  const { tasks, loading, error } = useSelector((state) => state.task);
  const { selectedCategory } = useSelector((state) => state.menu);

  // Get the start of the current day
  const today = moment().startOf("day");

  // Helper functions to determine if a task date is today, upcoming, or past
  const isToday = (date) => moment(date).isSame(today, "day");
  const isUpcoming = (date) => !date || moment(date).isAfter(today, "day");
  const isPast = (date) => date && moment(date).isBefore(today, "day");

  // Filter tasks based on the selected category
  const filteredTasks = selectedCategory === 'All' ? tasks : tasks.filter((task) => task.category === selectedCategory);

  // Further filter tasks based on the date
  const todayTasks = filteredTasks.filter((task) => isToday(task.date));
  const upcomingTasks = filteredTasks.filter((task) => isUpcoming(task.date));
  const pastTasks = filteredTasks.filter((task) => isPast(task.date));

  // Fetch tasks when the component mounts
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Handle toggling the task status
  const handleToggle = (taskId, status) => {
    dispatch(updateTask({ id: taskId, data: { status: !status } }));
  };

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return (
      <div>
        Error: {error.message || "An error occurred while fetching tasks."}
      </div>
    );
  }

  // Display message if no tasks are available
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <div>No tasks available</div>;
  }

  // Sort tasks by status (incomplete first)
  const sortTasks = (taskList) => [...taskList].sort((a, b) => a.status - b.status);

  // Determine which tasks to display based on the section
  let tasksToDisplay;
  switch (section) {
    case "Today":
      tasksToDisplay = sortTasks(todayTasks);
      break;
    case "Upcoming":
      tasksToDisplay = sortTasks(upcomingTasks);
      break;
    case "Past":
      tasksToDisplay = sortTasks(pastTasks);
      break;
    default:
      tasksToDisplay = [];
  }

  // Render the list of tasks
  return (
    <div className={styles.taskList}>
      {tasksToDisplay.map((task) => (
        <Task
          key={task._id}
          task={task}
          onToggle={() => handleToggle(task._id, task.status)}
        />
      ))}
    </div>
  );
};

export default TaskList;
