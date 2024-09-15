// App.js
import React, { useState } from 'react';
import SideMenu from './components/SideMenu';
import Dashboard from './components/Dashboard';
import styles from './App.module.css';

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className={styles.container}>
        <SideMenu isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
        <Dashboard toggleSidebar={toggleSidebar} />
      </div>
    </>
  );
}

export default App;
