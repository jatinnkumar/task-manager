import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import config from '../config/config';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  refreshTasks: () => void;
  task?: {
    _id?: string;
    title: string;
    description: string;
    status: 'completed' | 'incomplete';
    dueTimestamp: string;
  } | null;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, refreshTasks, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'completed' | 'incomplete'>('incomplete');
  const [dueTimestamp, setDueTimestamp] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setDueTimestamp(task.dueTimestamp);
    } else {
      resetForm();
    }
  }, [task]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('incomplete');
    setDueTimestamp('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { title, description, status, dueTimestamp };

    try {
      if (task && task._id) {
        await axios.put(`${config.baseUrl}/tasks/${task._id}`, formData);
      } else {
        await axios.post(`${config.baseUrl}/tasks`, formData);
      }
      resetForm();
      refreshTasks();
      onClose();
    } catch (error) {
      console.error("Failed to submit task", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="task-form-title">
      <Box sx={modalStyle}>
        <Typography id="task-form-title" variant="h6" component="h2">
          {task ? 'Edit Task' : 'Add New Task'}
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Due Date and Time"
            type="datetime-local"
            value={dueTimestamp}
            onChange={(e) => setDueTimestamp(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value as 'completed' | 'incomplete')}
            >
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="incomplete">Incomplete</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained">{task ? 'Update' : 'Add'} Task</Button>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskForm;
