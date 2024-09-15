import React from 'react';
import styles from './TaskList.module.css';
import moment from 'moment';

const Task = ({ task, onToggle }) => {
    const today = moment().startOf('day');
    const dueDate = task.date ? moment(task.date) : null;
    const isToday = dueDate && dueDate.isSame(today, 'day');
    const isPast = dueDate && dueDate.isBefore(today, 'day');

    return (
        <div className={styles.taskItem}>
            <div 
                className={`${styles.checkbox} ${task.status ? styles.checked : ''}`} 
                onClick={() => onToggle(task._id)} 
            >
                {task.status && '✔'}
            </div>
            <span className={task.status ? styles.completed : ''}>{task.title}</span>
            <span className={`${styles.dueDate} ${isPast ? styles.pastDue : isToday ? styles.todayDue : ''}`}>
                {dueDate ? dueDate.format('DD MMM') : ''}
            </span>
        </div>
    );
};


export default Task;
