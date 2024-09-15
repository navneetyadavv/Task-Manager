// Task.js
import React, { useState } from 'react';
import styles from './TaskList.module.css';
import moment from 'moment';

const Task = ({ task, onToggle, onDelete, onUpdate }) => {
    const [showMenu, setShowMenu] = useState(false);
    const today = moment().startOf('day');
    const dueDate = task.date ? moment(task.date) : null;
    const isToday = dueDate && dueDate.isSame(today, 'day');
    const isPast = dueDate && dueDate.isBefore(today, 'day');

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };

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
            <div className={styles.menuContainer}>
                <button className={styles.menuButton} onClick={handleMenuToggle}>⋮</button>
                {showMenu && (
                    <div className={styles.dropdownMenu}>
                        <div onClick={() => onDelete(task._id)}>Delete</div>
                        <div onClick={() => onUpdate(task)}>Update</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Task;
