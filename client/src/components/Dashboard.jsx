import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Dashboard.module.css";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";

function Dashboard({ toggleSidebar }) {
  
  // State to manage the visibility of the CreateTask modal
  const [show, setShow] = useState(false);

  // Function to toggle the CreateTask modal
  const handleShow = () => {
    setShow(!show);
  };

  // Get the selected category from the Redux store
  const { selectedCategory } = useSelector((state) => state.menu);

  return (
    <div className={styles.container}>
      {/* Header section with selected category and sidebar toggle button */}
      <div className={styles.header}>
        {selectedCategory}
        <button className={styles.hamburger} onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      {/* Main content container */}
      <div className={styles.contentContainer}>
        {/* Conditionally render the CreateTask modal */}
        {show && <CreateTask onClose={handleShow} />}

        {/* Section for upcoming tasks */}
        <div className={styles.section}>
          <h2>Upcoming</h2>
          <TaskList section="Upcoming" />
        </div>

        {/* Section for today's tasks */}
        <div className={styles.section}>
          <h2>Today</h2>
          <TaskList section="Today" />
        </div>

        {/* Section for past tasks */}
        <div className={styles.section}>
          <h2>Past</h2>
          <TaskList section="Past" />
        </div>
      </div>

      {/* Button to open the CreateTask modal */}
      <div className={styles.addTaskContainer}>
        <button className={styles.plusButton} onClick={handleShow}>
          <span className={styles.plusIcon}>+</span>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
