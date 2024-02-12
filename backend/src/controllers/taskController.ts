import { Request, Response } from 'express';
import { TaskManager } from '../services/taskManager.js';
import * as responseManager from '../utils/responseManager.js';

const taskManager = new TaskManager();

export const getTasks = (req: Request, res: Response) => {
  taskManager
    .getTasks(req.query)
    .then((result: any) =>
      responseManager.sendSuccessResponse(res, result, "Tasks fetched successfully")
    )
    .catch((err: any) => responseManager.sendErrorResponse(res, err));
};

export const getTaskById = (req: Request, res: Response) => {
  taskManager
    .getTaskById(req.params.id)
    .then((result: any) =>
      responseManager.sendSuccessResponse(res, result, "Task fetched successfully")
    )
    .catch((err: any) => responseManager.sendErrorResponse(res, err));
};

export const createTask = (req: Request, res: Response) => {
  taskManager
    .createTask(req.body)
    .then((result: any) =>
      responseManager.sendSuccessResponse(res, result, "Task created successfully")
    )
    .catch((err: any) => responseManager.sendErrorResponse(res, err));
};

export const updateTask = (req: Request, res: Response) => {
  taskManager
    .updateTask(req.params.id, req.body)
    .then((result: any) =>
      responseManager.sendSuccessResponse(res, result, "Task updated successfully")
    )
    .catch((err: any) => responseManager.sendErrorResponse(res, err));
};

export const deleteTask = (req: Request, res: Response) => {
  taskManager
    .deleteTask(req.params.id)
    .then((result: any) =>
      responseManager.sendSuccessResponse(res, result, "Task deleted successfully")
    )
    .catch((err: any) => responseManager.sendErrorResponse(res, err));
};
