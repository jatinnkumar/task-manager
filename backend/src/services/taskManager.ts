import { TaskModel } from '../models/taskModel.js';

export class TaskManager {
  async getTasks(query: any) {
    const { page = 1, limit = 10 } = query;
    try {
      const tasks = await TaskModel.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await TaskModel.countDocuments();
      return {
        tasks,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
      };
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(id: string) {
    try {
      const task = await TaskModel.findById(id);
      if (!task) throw new Error('Task not found');
      return task;
    } catch (error) {
      throw error;
    }
  }

  async createTask(data: any) {
    try {
      const task = new TaskModel(data);
      await task.save();
      return task;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(id: string, data: any) {
    try {
      const task = await TaskModel.findByIdAndUpdate(id, data, { new: true });
      if (!task) throw new Error('Task not found');
      return task;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(id: string) {
    try {
      const task = await TaskModel.findByIdAndDelete(id);
      if (!task) throw new Error('Task not found');
      return { message: 'Task successfully deleted' };
    } catch (error) {
      throw error;
    }
  }
}
