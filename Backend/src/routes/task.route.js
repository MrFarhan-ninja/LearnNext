import {Router} from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { createTask, deleteTask, getTaskByProject,updateTask,updateTaskStatus } from "../controllers/task.controller.js";

const taskRoute = Router()


taskRoute.route('/create-task').post(createTask)

taskRoute.route('/get-task/:projectid').get(getTaskByProject)

taskRoute.route('/deletetask/:taskid').get(deleteTask)

taskRoute.route('/updateTask/:taskid').post(updateTask)

taskRoute.route('/updateStatusTask/:id').post(updateTaskStatus)


export default taskRoute