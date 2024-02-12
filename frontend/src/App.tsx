import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Button, Box } from '@mui/material';
import { Task } from './types/Task';
import axios from 'axios';
import config from './config/config';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenModal = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const refreshTasks = () => {

    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${config.baseUrl}/tasks/${taskId}`);
      refreshTasks();
    } catch (error) {
      console.error("Failed to delete task", error);

    }
  };


  return (

    <Box sx={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <Button variant="contained" onClick={handleOpenModal} sx={{ marginBottom: '20px' }}>
        Add Task
      </Button>
      <TaskForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        refreshTasks={refreshTasks}
        task={currentTask}
      />
      <TaskList
        onEdit={(task) => {
          setCurrentTask(task);
          setIsModalOpen(true);
        }}
        onDelete={handleDeleteTask}
        refreshKey={refreshKey}
      />
    </Box>
  );
}

export default App;
