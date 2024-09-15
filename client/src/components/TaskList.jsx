// TaskList.js
import React, { useEffect, useState } from "react";
import Task from "./Task";
import styles from "./TaskList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask, deleteTask } from "../features/task/taskSlice";
import moment from "moment";
import CreateTask from "./CreateTask";

const TaskList = ({ section }) => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.task);
    const { selectedCategory } = useSelector((state) => state.menu);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    const today = moment().startOf("day");

    const isToday = (date) => moment(date).isSame(today, "day");
    const isUpcoming = (date) => !date || moment(date).isAfter(today, "day");
    const isPast = (date) => date && moment(date).isBefore(today, "day");

    const filteredTasks = selectedCategory === 'All' ? tasks : tasks.filter((task) => task.category === selectedCategory);
    const todayTasks = filteredTasks.filter((task) => isToday(task.date));
    const upcomingTasks = filteredTasks.filter((task) => isUpcoming(task.date));
    const pastTasks = filteredTasks.filter((task) => isPast(task.date));

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleToggle = (taskId, status) => {
        dispatch(updateTask({ id: taskId, data: { status: !status } }));
    };

    const handleDelete = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    const handleUpdate = (task) => {
        setTaskToUpdate(task);
    };

    const handleCloseUpdateModal = () => {
        setTaskToUpdate(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                Error: {error.message || "An error occurred while fetching tasks."}
            </div>
        );
    }

    if (!Array.isArray(tasks) || tasks.length === 0) {
        return <div>No tasks available</div>;
    }

    const sortTasks = (taskList) => [...taskList].sort((a, b) => a.status - b.status);

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

    return (
        <div className={styles.taskList}>
            {tasksToDisplay.map((task) => (
                <Task
                    key={task._id}
                    task={task}
                    onToggle={() => handleToggle(task._id, task.status)}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            ))}
            {taskToUpdate && (
                <CreateTask
                    onClose={handleCloseUpdateModal}
                    initialData={taskToUpdate}
                />
            )}
        </div>
    );
};

export default TaskList;
