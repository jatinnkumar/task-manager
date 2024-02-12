import mongoose, { Schema } from 'mongoose';

interface Task {
  title: string;
  description: string;
  status: 'completed' | 'incomplete';
  dueTimestamp: Date;
}

const taskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, enum: ['completed', 'incomplete'] },
  dueTimestamp: { type: Date, required: true },
});

export const TaskModel = mongoose.model<Task>('Task', taskSchema);
