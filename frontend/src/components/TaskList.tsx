import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'completed' | 'incomplete';
  dueTimestamp: string;
}

interface TaskListProps {
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  refreshKey: number;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit, onDelete, refreshKey }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(`${config.baseUrl}/tasks`);
      setTasks(response.data.data.tasks);
    };

    fetchTasks();
  }, [refreshKey]);

  return (
    <Box sx={{ maxWidth: '600px', margin: 'auto' }}> {}
      {tasks.map((task) => (
        <Card key={task._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            <Typography color="text.secondary">{task.description}</Typography>
            <Typography color="text.secondary">Due: {task.dueTimestamp}</Typography>
            <Typography color={task.status === 'completed' ? 'green' : 'red'}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)} {/* Capitalize the status */}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 2 }}>
            <Button onClick={() => onEdit(task)} startIcon={<EditIcon />}>Edit</Button>
            <Button onClick={() => onDelete(task._id)} startIcon={<DeleteIcon />} sx={{ marginLeft: 1 }}>Delete</Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default TaskList;
