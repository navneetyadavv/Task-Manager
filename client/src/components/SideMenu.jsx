import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SideMenu.module.css';
import { setSelectedCategory } from '../features/tab/tabSlice';
import { fetchTasks } from '../features/task/taskSlice';

function SideMenu({ isVisible, toggleSidebar }) {

  const dispatch = useDispatch();

  // Get the selected category from the Redux store
  const selectedCategory = useSelector((state) => state.menu.selectedCategory);
  
  // Get the list of categories from the Redux store
  const { categories } = useSelector((state) => state.task);

  // Fetch tasks when the component mounts
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Handle category click event
  const handleCategoryClick = (categoryName) => {
    dispatch(setSelectedCategory(categoryName));
    toggleSidebar();
  };

  return (
    <div className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.menuHead}>Menu</div>
      <div className={styles.taskContainer}>
        <div className={styles.taskHead}>Categories</div>
        {/* Render the list of categories */}
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${styles.taskOpt} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideMenu;
